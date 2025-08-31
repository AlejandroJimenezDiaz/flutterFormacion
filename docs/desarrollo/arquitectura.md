---
sidebar_position: 2
---

# 🏛️ Arquitectura y Patrones

> **Objetivo**: Implementar Clean Architecture con BLoC Pattern para aplicaciones escalables

En esta sección aprenderás a aplicar patrones de arquitectura profesionales que permiten crear aplicaciones Flutter mantenibles, testeable y escalables.

## 🎯 **¿Por qué Clean Architecture?**

### 📊 **Beneficios principales:**
- 🧩 **Separación de responsabilidades** - Cada capa tiene su propósito
- 🧪 **Facilidad de testing** - Cada capa se puede probar independientemente  
- 🔄 **Flexibilidad** - Cambios en UI no afectan lógica de negocio
- 👥 **Colaboración en equipo** - Estructura clara para todos
- 📈 **Escalabilidad** - Fácil agregar nuevas funcionalidades

### 🏗️ **Las 3 capas principales:**

```
📱 Presentation Layer    ← UI, Widgets, BLoCs
📊 Domain Layer         ← Business Logic, Entities, Use Cases  
💾 Data Layer          ← APIs, Database, Models
```

## 🏗️ **Domain Layer - El Corazón**

### 🎯 **Entidades (Entities)**

Las entidades representan los objetos de negocio principales de tu aplicación:

```dart title="lib/domain/entities/post.dart"
import 'package:equatable/equatable.dart';

class Post extends Equatable {
  const Post({
    required this.id,
    required this.title,
    required this.content,
    required this.authorId,
    required this.createdAt,
    this.imageUrl,
    this.likeCount = 0,
    this.commentCount = 0,
    this.isLiked = false,
    this.tags = const [],
  });

  final String id;
  final String title;
  final String content;
  final String authorId;
  final DateTime createdAt;
  final String? imageUrl;
  final int likeCount;
  final int commentCount;
  final bool isLiked;
  final List<String> tags;

  @override
  List<Object?> get props => [
        id,
        title,
        content,
        authorId,
        createdAt,
        imageUrl,
        likeCount,
        commentCount,
        isLiked,
        tags,
      ];

  Post copyWith({
    String? id,
    String? title,
    String? content,
    String? authorId,
    DateTime? createdAt,
    String? imageUrl,
    int? likeCount,
    int? commentCount,
    bool? isLiked,
    List<String>? tags,
  }) {
    return Post(
      id: id ?? this.id,
      title: title ?? this.title,
      content: content ?? this.content,
      authorId: authorId ?? this.authorId,
      createdAt: createdAt ?? this.createdAt,
      imageUrl: imageUrl ?? this.imageUrl,
      likeCount: likeCount ?? this.likeCount,
      commentCount: commentCount ?? this.commentCount,
      isLiked: isLiked ?? this.isLiked,
      tags: tags ?? this.tags,
    );
  }
}
```

### 📋 **Repositories (Contratos)**

Los repositories definen **qué** operaciones puedes hacer, no **cómo**:

```dart title="lib/domain/repositories/post_repository.dart"
import '../entities/post.dart';

abstract class PostRepository {
  // 📄 Operaciones CRUD
  Future<List<Post>> getPosts({
    int page = 1,
    int limit = 10,
    String? category,
  });
  
  Future<Post> getPostById(String id);
  
  Future<Post> createPost(Post post);
  
  Future<Post> updatePost(Post post);
  
  Future<void> deletePost(String id);
  
  // 👍 Interacciones
  Future<void> likePost(String postId);
  
  Future<void> unlikePost(String postId);
  
  // 🔍 Búsqueda
  Future<List<Post>> searchPosts(String query);
  
  // 📊 Streams para datos en tiempo real
  Stream<List<Post>> watchPosts();
  
  Stream<Post> watchPost(String id);
}
```

### ⚙️ **Use Cases (Casos de Uso)**

Cada caso de uso representa una acción específica que el usuario puede realizar:

```dart title="lib/domain/usecases/get_posts_usecase.dart"
import 'package:injectable/injectable.dart';

import '../../core/resources/use_case.dart';
import '../../core/resources/data_state.dart';
import '../entities/post.dart';
import '../repositories/post_repository.dart';

@injectable
class GetPostsUseCase implements UseCase<DataState<List<Post>>, GetPostsParams> {
  const GetPostsUseCase(this._postRepository);

  final PostRepository _postRepository;

  @override
  Future<DataState<List<Post>>> call(GetPostsParams params) async {
    try {
      // 📊 Validaciones de negocio
      if (params.page < 1) {
        return const DataState.error('La página debe ser mayor a 0');
      }
      
      if (params.limit < 1 || params.limit > 100) {
        return const DataState.error('El límite debe estar entre 1 y 100');
      }

      // 📱 Obtener posts
      final posts = await _postRepository.getPosts(
        page: params.page,
        limit: params.limit,
        category: params.category,
      );

      // 🎯 Lógica de negocio adicional
      final filteredPosts = _applyBusinessRules(posts);

      return DataState.success(filteredPosts);
      
    } catch (e) {
      return DataState.error(e.toString());
    }
  }

  List<Post> _applyBusinessRules(List<Post> posts) {
    // 📋 Ejemplo: filtrar posts con contenido inapropiado
    return posts.where((post) => !_hasInappropriateContent(post)).toList();
  }

  bool _hasInappropriateContent(Post post) {
    // 🔍 Lógica de validación de contenido
    final inappropriateWords = ['spam', 'fake', 'scam'];
    final content = '${post.title} ${post.content}'.toLowerCase();
    
    return inappropriateWords.any((word) => content.contains(word));
  }
}

class GetPostsParams {
  const GetPostsParams({
    this.page = 1,
    this.limit = 10,
    this.category,
  });

  final int page;
  final int limit;
  final String? category;
}
```

## 💾 **Data Layer - Fuentes de Datos**

### 🌐 **Remote Data Sources**

Manejan la comunicación con APIs externas:

```dart title="lib/data/datasources/remote/post_remote_datasource.dart"
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:retrofit/retrofit.dart';

import '../../../core/constants/api_constants.dart';
import '../../models/post_model.dart';

part 'post_remote_datasource.g.dart';

@RestApi(baseUrl: ApiConstants.baseUrl)
@injectable
abstract class PostRemoteDataSource {
  @factoryMethod
  factory PostRemoteDataSource(Dio dio) = _PostRemoteDataSource;

  // 📄 Operaciones CRUD
  @GET('/posts')
  Future<List<PostModel>> getPosts(
    @Query('page') int page,
    @Query('limit') int limit,
    @Query('category') String? category,
  );

  @GET('/posts/{id}')
  Future<PostModel> getPostById(@Path('id') String id);

  @POST('/posts')
  Future<PostModel> createPost(@Body() PostModel post);

  @PUT('/posts/{id}')
  Future<PostModel> updatePost(
    @Path('id') String id,
    @Body() PostModel post,
  );

  @DELETE('/posts/{id}')
  Future<void> deletePost(@Path('id') String id);

  // 👍 Interacciones
  @POST('/posts/{id}/like')
  Future<void> likePost(@Path('id') String postId);

  @DELETE('/posts/{id}/like')
  Future<void> unlikePost(@Path('id') String postId);

  // 🔍 Búsqueda
  @GET('/posts/search')
  Future<List<PostModel>> searchPosts(@Query('q') String query);
}
```

### 💾 **Local Data Sources**

Manejan almacenamiento local (cache, base de datos local):

```dart title="lib/data/datasources/local/post_local_datasource.dart"
import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

import '../../../core/constants/storage_constants.dart';
import '../../models/post_model.dart';

abstract class PostLocalDataSource {
  Future<List<PostModel>> getCachedPosts();
  Future<void> cachePosts(List<PostModel> posts);
  Future<PostModel?> getCachedPost(String id);
  Future<void> cachePost(PostModel post);
  Future<void> deleteCachedPost(String id);
  Future<void> clearCache();
}

@Injectable(as: PostLocalDataSource)
class PostLocalDataSourceImpl implements PostLocalDataSource {
  PostLocalDataSourceImpl(this._hiveBox);

  final Box<PostModel> _hiveBox;

  @override
  Future<List<PostModel>> getCachedPosts() async {
    try {
      return _hiveBox.values.toList()
        ..sort((a, b) => b.createdAt.compareTo(a.createdAt));
    } catch (e) {
      throw Exception('Error obteniendo posts del cache: $e');
    }
  }

  @override
  Future<void> cachePosts(List<PostModel> posts) async {
    try {
      // 🗑️ Limpiar cache existente
      await _hiveBox.clear();
      
      // 💾 Guardar nuevos posts
      for (final post in posts) {
        await _hiveBox.put(post.id, post);
      }
    } catch (e) {
      throw Exception('Error guardando posts en cache: $e');
    }
  }

  @override
  Future<PostModel?> getCachedPost(String id) async {
    try {
      return _hiveBox.get(id);
    } catch (e) {
      throw Exception('Error obteniendo post del cache: $e');
    }
  }

  @override
  Future<void> cachePost(PostModel post) async {
    try {
      await _hiveBox.put(post.id, post);
    } catch (e) {
      throw Exception('Error guardando post en cache: $e');
    }
  }

  @override
  Future<void> deleteCachedPost(String id) async {
    try {
      await _hiveBox.delete(id);
    } catch (e) {
      throw Exception('Error eliminando post del cache: $e');
    }
  }

  @override
  Future<void> clearCache() async {
    try {
      await _hiveBox.clear();
    } catch (e) {
      throw Exception('Error limpiando cache: $e');
    }
  }
}
```

### 📊 **Repository Implementation**

Implementa la lógica de coordinación entre fuentes locales y remotas:

```dart title="lib/data/repositories/post_repository_impl.dart"
import 'package:injectable/injectable.dart';

import '../../core/network/network_info.dart';
import '../../domain/entities/post.dart';
import '../../domain/repositories/post_repository.dart';
import '../datasources/local/post_local_datasource.dart';
import '../datasources/remote/post_remote_datasource.dart';

@Injectable(as: PostRepository)
class PostRepositoryImpl implements PostRepository {
  const PostRepositoryImpl(
    this._remoteDataSource,
    this._localDataSource,
    this._networkInfo,
  );

  final PostRemoteDataSource _remoteDataSource;
  final PostLocalDataSource _localDataSource;
  final NetworkInfo _networkInfo;

  @override
  Future<List<Post>> getPosts({
    int page = 1,
    int limit = 10,
    String? category,
  }) async {
    if (await _networkInfo.isConnected) {
      try {
        // 🌐 Obtener de API
        final remotePosts = await _remoteDataSource.getPosts(
          page,
          limit,
          category,
        );

        // 💾 Guardar en cache (solo primera página)
        if (page == 1) {
          await _localDataSource.cachePosts(remotePosts);
        }

        return remotePosts.map((model) => model.toEntity()).toList();
        
      } catch (e) {
        // 📱 Si falla API, usar cache
        final cachedPosts = await _localDataSource.getCachedPosts();
        return cachedPosts.map((model) => model.toEntity()).toList();
      }
    } else {
      // 📱 Sin internet, usar cache
      final cachedPosts = await _localDataSource.getCachedPosts();
      return cachedPosts.map((model) => model.toEntity()).toList();
    }
  }

  @override
  Future<Post> getPostById(String id) async {
    if (await _networkInfo.isConnected) {
      try {
        final remotePost = await _remoteDataSource.getPostById(id);
        
        // 💾 Actualizar cache
        await _localDataSource.cachePost(remotePost);
        
        return remotePost.toEntity();
      } catch (e) {
        // 📱 Si falla API, usar cache
        final cachedPost = await _localDataSource.getCachedPost(id);
        if (cachedPost != null) {
          return cachedPost.toEntity();
        }
        rethrow;
      }
    } else {
      // 📱 Sin internet, usar cache
      final cachedPost = await _localDataSource.getCachedPost(id);
      if (cachedPost != null) {
        return cachedPost.toEntity();
      }
      throw Exception('Post no encontrado en cache');
    }
  }

  @override
  Future<Post> createPost(Post post) async {
    if (!await _networkInfo.isConnected) {
      throw Exception('Se requiere conexión a internet para crear posts');
    }

    try {
      final postModel = PostModel.fromEntity(post);
      final createdPost = await _remoteDataSource.createPost(postModel);
      
      // 💾 Agregar al cache
      await _localDataSource.cachePost(createdPost);
      
      return createdPost.toEntity();
    } catch (e) {
      throw Exception('Error creando post: $e');
    }
  }

  @override
  Future<void> likePost(String postId) async {
    if (!await _networkInfo.isConnected) {
      throw Exception('Se requiere conexión a internet');
    }

    try {
      await _remoteDataSource.likePost(postId);
      
      // 💾 Actualizar cache local
      final cachedPost = await _localDataSource.getCachedPost(postId);
      if (cachedPost != null) {
        final updatedPost = cachedPost.copyWith(
          likeCount: cachedPost.likeCount + 1,
          isLiked: true,
        );
        await _localDataSource.cachePost(updatedPost);
      }
    } catch (e) {
      throw Exception('Error dando like: $e');
    }
  }

  @override
  Stream<List<Post>> watchPosts() async* {
    // 📊 Implementar stream que combina datos locales y remotos
    // Esta es una implementación simplificada
    while (true) {
      try {
        final posts = await getPosts();
        yield posts;
        await Future.delayed(const Duration(seconds: 30)); // Polling cada 30s
      } catch (e) {
        // Manejar errores del stream
      }
    }
  }

  // ... Implementar resto de métodos
}
```

## 📱 **Presentation Layer - BLoC Pattern**

### 🎯 **PostCubit - Gestión de Estado**

```dart title="lib/presentation/cubit/post_cubit.dart"
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:freezed/freezed.dart';

import '../../core/resources/data_state.dart';
import '../../domain/entities/post.dart';
import '../../domain/usecases/get_posts_usecase.dart';
import '../../domain/usecases/create_post_usecase.dart';
import '../../domain/usecases/like_post_usecase.dart';

part 'post_cubit.freezed.dart';
part 'post_state.dart';

@injectable
class PostCubit extends Cubit<PostState> {
  PostCubit(
    this._getPostsUseCase,
    this._createPostUseCase,
    this._likePostUseCase,
  ) : super(const PostState.loading());

  final GetPostsUseCase _getPostsUseCase;
  final CreatePostUseCase _createPostUseCase;
  final LikePostUseCase _likePostUseCase;

  List<Post> _allPosts = [];
  int _currentPage = 1;
  bool _hasReachedMax = false;

  Future<void> loadPosts({bool refresh = false}) async {
    if (refresh) {
      _currentPage = 1;
      _hasReachedMax = false;
      _allPosts.clear();
      emit(const PostState.loading());
    }

    if (_hasReachedMax) return;

    try {
      final result = await _getPostsUseCase.call(
        GetPostsParams(page: _currentPage, limit: 10),
      );

      result.when(
        success: (posts) {
          if (posts.isEmpty) {
            _hasReachedMax = true;
          } else {
            _allPosts.addAll(posts);
            _currentPage++;
          }
          
          emit(PostState.loaded(
            posts: List.from(_allPosts),
            hasReachedMax: _hasReachedMax,
          ));
        },
        error: (message) {
          if (_allPosts.isEmpty) {
            emit(PostState.error(message));
          } else {
            // Mantener posts existentes pero mostrar error
            emit(PostState.loaded(
              posts: List.from(_allPosts),
              hasReachedMax: _hasReachedMax,
              errorMessage: message,
            ));
          }
        },
      );
    } catch (e) {
      emit(PostState.error(e.toString()));
    }
  }

  Future<void> createPost(Post post) async {
    emit(PostState.creating(List.from(_allPosts)));

    try {
      final result = await _createPostUseCase.call(post);

      result.when(
        success: (createdPost) {
          _allPosts.insert(0, createdPost);
          emit(PostState.loaded(
            posts: List.from(_allPosts),
            hasReachedMax: _hasReachedMax,
          ));
        },
        error: (message) {
          emit(PostState.loaded(
            posts: List.from(_allPosts),
            hasReachedMax: _hasReachedMax,
            errorMessage: message,
          ));
        },
      );
    } catch (e) {
      emit(PostState.loaded(
        posts: List.from(_allPosts),
        hasReachedMax: _hasReachedMax,
        errorMessage: e.toString(),
      ));
    }
  }

  Future<void> likePost(String postId) async {
    try {
      // 🎯 Optimistic update
      final postIndex = _allPosts.indexWhere((p) => p.id == postId);
      if (postIndex != -1) {
        final post = _allPosts[postIndex];
        _allPosts[postIndex] = post.copyWith(
          isLiked: !post.isLiked,
          likeCount: post.isLiked 
              ? post.likeCount - 1 
              : post.likeCount + 1,
        );
        emit(PostState.loaded(
          posts: List.from(_allPosts),
          hasReachedMax: _hasReachedMax,
        ));
      }

      // 🌐 Actualizar en servidor
      await _likePostUseCase.call(postId);
      
    } catch (e) {
      // 🔄 Revertir cambio optimista en caso de error
      await loadPosts(refresh: true);
      emit(PostState.loaded(
        posts: List.from(_allPosts),
        hasReachedMax: _hasReachedMax,
        errorMessage: 'Error actualizando like',
      ));
    }
  }

  void searchPosts(String query) {
    if (query.isEmpty) {
      emit(PostState.loaded(
        posts: List.from(_allPosts),
        hasReachedMax: _hasReachedMax,
      ));
      return;
    }

    final filteredPosts = _allPosts.where((post) {
      return post.title.toLowerCase().contains(query.toLowerCase()) ||
             post.content.toLowerCase().contains(query.toLowerCase());
    }).toList();

    emit(PostState.loaded(
      posts: filteredPosts,
      hasReachedMax: true, // No pagination en búsqueda
    ));
  }
}
```

### 🎭 **PostState - Estados**

```dart title="lib/presentation/cubit/post_state.dart"
part of 'post_cubit.dart';

@freezed
class PostState with _$PostState {
  const factory PostState.loading() = _Loading;
  
  const factory PostState.loaded({
    required List<Post> posts,
    @Default(false) bool hasReachedMax,
    String? errorMessage,
  }) = _Loaded;
  
  const factory PostState.creating(List<Post> currentPosts) = _Creating;
  
  const factory PostState.error(String message) = _Error;
}
```

## 🎨 **UI Implementation**

### 📱 **Posts Page**

```dart title="lib/presentation/pages/posts/posts_page.dart"
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:auto_route/auto_route.dart';

import '../../../core/di/injection.dart';
import '../../cubit/post_cubit.dart';
import '../../widgets/post_item.dart';
import '../../widgets/loading_indicator.dart';
import '../../widgets/error_message.dart';

@RoutePage()
class PostsPage extends StatefulWidget implements AutoRouteWrapper {
  const PostsPage({Key? key}) : super(key: key);

  @override
  Widget wrappedRoute(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<PostCubit>()..loadPosts(),
      child: this,
    );
  }

  @override
  State<PostsPage> createState() => _PostsPageState();
}

class _PostsPageState extends State<PostsPage> {
  final _scrollController = ScrollController();
  final _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  void _onScroll() {
    if (_scrollController.position.pixels ==
        _scrollController.position.maxScrollExtent) {
      // 📄 Cargar más posts al llegar al final
      context.read<PostCubit>().loadPosts();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Posts'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: _showCreatePostDialog,
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(60),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Buscar posts...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: (query) {
                context.read<PostCubit>().searchPosts(query);
              },
            ),
          ),
        ),
      ),
      body: BlocBuilder<PostCubit, PostState>(
        builder: (context, state) {
          return state.when(
            loading: () => const LoadingIndicator(),
            loaded: (posts, hasReachedMax, errorMessage) {
              return RefreshIndicator(
                onRefresh: () => context.read<PostCubit>().loadPosts(refresh: true),
                child: Column(
                  children: [
                    if (errorMessage != null)
                      ErrorMessage(
                        message: errorMessage,
                        onRetry: () => context.read<PostCubit>().loadPosts(),
                      ),
                    Expanded(
                      child: ListView.builder(
                        controller: _scrollController,
                        itemCount: posts.length + (hasReachedMax ? 0 : 1),
                        itemBuilder: (context, index) {
                          if (index >= posts.length) {
                            return const LoadingIndicator();
                          }
                          
                          return PostItem(
                            post: posts[index],
                            onLike: () => context
                                .read<PostCubit>()
                                .likePost(posts[index].id),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              );
            },
            creating: (currentPosts) => Column(
              children: [
                const LinearProgressIndicator(),
                Expanded(
                  child: ListView.builder(
                    itemCount: currentPosts.length,
                    itemBuilder: (context, index) {
                      return PostItem(
                        post: currentPosts[index],
                        onLike: () => context
                            .read<PostCubit>()
                            .likePost(currentPosts[index].id),
                      );
                    },
                  ),
                ),
              ],
            ),
            error: (message) => ErrorMessage(
              message: message,
              onRetry: () => context.read<PostCubit>().loadPosts(refresh: true),
            ),
          );
        },
      ),
    );
  }

  void _showCreatePostDialog() {
    // Implementar dialog de creación de post
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _searchController.dispose();
    super.dispose();
  }
}
```

## 🧪 **Testing la Arquitectura**

### 🎯 **Test de Use Case**

```dart title="test/domain/usecases/get_posts_usecase_test.dart"
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';

import 'package:selfie_street/core/resources/data_state.dart';
import 'package:selfie_street/domain/entities/post.dart';
import 'package:selfie_street/domain/repositories/post_repository.dart';
import 'package:selfie_street/domain/usecases/get_posts_usecase.dart';

import 'get_posts_usecase_test.mocks.dart';

@GenerateMocks([PostRepository])
void main() {
  late GetPostsUseCase usecase;
  late MockPostRepository mockRepository;

  setUp(() {
    mockRepository = MockPostRepository();
    usecase = GetPostsUseCase(mockRepository);
  });

  group('GetPostsUseCase', () {
    final testPosts = [
      Post(
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        authorId: 'author1',
        createdAt: DateTime.now(),
      ),
    ];

    test('should return posts from repository when successful', () async {
      // Arrange
      when(mockRepository.getPosts(page: 1, limit: 10))
          .thenAnswer((_) async => testPosts);

      // Act
      final result = await usecase.call(
        const GetPostsParams(page: 1, limit: 10),
      );

      // Assert
      expect(result, isA<DataState<List<Post>>>());
      result.when(
        success: (posts) => expect(posts, equals(testPosts)),
        error: (_) => fail('Should return success'),
      );
      
      verify(mockRepository.getPosts(page: 1, limit: 10));
      verifyNoMoreInteractions(mockRepository);
    });

    test('should return error when page is invalid', () async {
      // Act
      final result = await usecase.call(
        const GetPostsParams(page: 0, limit: 10),
      );

      // Assert
      result.when(
        success: (_) => fail('Should return error'),
        error: (message) => expect(message, 'La página debe ser mayor a 0'),
      );
      
      verifyZeroInteractions(mockRepository);
    });

    test('should filter inappropriate content', () async {
      // Arrange
      final postsWithInappropriate = [
        Post(
          id: '1',
          title: 'Normal Post',
          content: 'Good content',
          authorId: 'author1',
          createdAt: DateTime.now(),
        ),
        Post(
          id: '2',
          title: 'Spam Post',
          content: 'This is spam content',
          authorId: 'author2',
          createdAt: DateTime.now(),
        ),
      ];
      
      when(mockRepository.getPosts(page: 1, limit: 10))
          .thenAnswer((_) async => postsWithInappropriate);

      // Act
      final result = await usecase.call(
        const GetPostsParams(page: 1, limit: 10),
      );

      // Assert
      result.when(
        success: (posts) {
          expect(posts.length, 1);
          expect(posts.first.title, 'Normal Post');
        },
        error: (_) => fail('Should return success'),
      );
    });
  });
}
```

## ✅ **Checklist de Arquitectura**

- [ ] Domain layer configurado correctamente
- [ ] Entidades definidas con Equatable
- [ ] Repository contracts creados
- [ ] Use cases implementados con validaciones
- [ ] Data sources (remote/local) implementados
- [ ] Repository implementation con cache strategy
- [ ] BLoC/Cubit con estados bien definidos
- [ ] UI conectada correctamente con BLoC
- [ ] Dependency injection configurado
- [ ] Testing unitario implementado
- [ ] Error handling en todas las capas

:::tip 🏗️ Mejores Prácticas
1. **Una responsabilidad por clase** - Single Responsibility Principle
2. **Depender de abstracciones**, no de implementaciones
3. **Usar Freezed** para clases immutable
4. **Manejar estados de loading/error** consistentemente
5. **Cachear datos** para mejor UX offline
6. **Escribir tests** para la lógica crítica
:::

---

## 🎯 **Siguiente Paso**

¡Excelente! Ya tienes una arquitectura robusta y escalable. 

👉 **Continúa con**: [Navegación y Routing](./navigation.md)

---

*⏱️ Tiempo de implementación: 6-8 horas*