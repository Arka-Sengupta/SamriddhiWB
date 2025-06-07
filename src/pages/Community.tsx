
import { useState, useEffect } from 'react';
import { Plus, Search, ThumbsUp, MessageSquare, Clock, User, Users, Bookmark, TrendingUp, X, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { createPost, getPosts, type Post } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const trendingTags = [
  "digital-marketing",
  "export-strategies",
  "micro-finance",
  "quality-control",
  "pricing",
  "social-media",
  "handmade",
  "rural-business"
];

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [discussionsSearchTerm, setDiscussionsSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "All",
    tags: [] as string[],
  });
  const [audioRecording, setAudioRecording] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const categories = [
    { key: "All", label: t('community.categories.all') },
    { key: "Marketing", label: t('community.categories.marketing') },
    { key: "Export", label: t('community.categories.export') },
    { key: "Finance", label: t('community.categories.finance') },
    { key: "Quality", label: t('community.categories.quality') },
    { key: "Technology", label: t('community.categories.technology') }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiscussionsSearch = post.title.toLowerCase().includes(discussionsSearchTerm.toLowerCase()) ||
                                   post.content.toLowerCase().includes(discussionsSearchTerm.toLowerCase()) ||
                                   post.authorName.toLowerCase().includes(discussionsSearchTerm.toLowerCase()) ||
                                   post.tags.some(tag => tag.toLowerCase().includes(discussionsSearchTerm.toLowerCase()));
    return matchesCategory && matchesSearch && matchesDiscussionsSearch;
  });

  const handleCreatePost = async () => {
    if (!isAuthenticated || !user) {
      alert(t('community.alerts.loginRequired'));
      return;
    }

    try {
      setIsLoading(true);
      await createPost({
        ...newPost,
        authorId: user.uid,
        authorName: user.name,
        tags: newPost.tags
      }, audioRecording);

      setNewPost({
        title: "",
        content: "",
        category: "All",
        tags: []
      });
      setAudioRecording(null);
      setIsCreatePostOpen(false);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      alert(t('community.alerts.postError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioRecording(file);
    }
  };

  return (
    <div className="min-h-screen bg-dark-base text-primary-text">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Create Post */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text" size={20} />
                <Input
                  type="text"
                  placeholder={t('community.searchPlaceholder')}
                  className="pl-10 bg-dark-container border-dark-container"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                <DialogTrigger asChild>
                  <Button className="ml-4 bg-terracotta hover:bg-terracotta/90">
                    <Plus size={20} className="mr-2" />
                    {t('community.createPost')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-container text-primary-text border-dark-container">
                  <DialogHeader>
                    <DialogTitle>{t('community.newPost')}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder={t('community.postTitle')}
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="bg-dark-base border-dark-container"
                    />
                    <Textarea
                      placeholder={t('community.postContent')}
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="bg-dark-base border-dark-container min-h-[100px]"
                    />
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full p-2 rounded-md bg-dark-base border border-dark-container text-primary-text"
                    >
                      {categories.map((category) => (
                        <option key={category.key} value={category.key}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="bg-dark-base border-dark-container"
                      />
                      <Mic className="text-terracotta" size={20} />
                    </div>
                    <Button
                      onClick={handleCreatePost}
                      disabled={isLoading || !newPost.title || !newPost.content}
                      className="w-full bg-terracotta hover:bg-terracotta/90"
                    >
                      {isLoading ? t('community.posting') : t('community.post')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={selectedCategory === category.key ? "bg-terracotta hover:bg-terracotta/90" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-dark-container border-dark-container">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold mb-2">{post.title}</CardTitle>
                        <div className="flex items-center text-sm text-secondary-text">
                          <User size={16} className="mr-1" />
                          <span>{post.authorName}</span>
                          <Clock size={16} className="ml-4 mr-1" />
                          <span>{new Date(post.timestamp?.toDate()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-text mb-4">{post.content}</p>
                    {post.audioUrl && (
                      <audio controls className="w-full mb-4">
                        <source src={post.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center ${likedPosts.includes(post.id || '') ? 'text-terracotta' : ''}`}
                          onClick={() => {
                            if (post.id) {
                              setLikedPosts(prev =>
                                prev.includes(post.id || '') 
                                  ? prev.filter(id => id !== post.id)
                                  : [...prev, post.id]
                              );
                            }
                          }}
                        >
                          <ThumbsUp size={16} className="mr-1" />
                          <span>{post.likes + (likedPosts.includes(post.id || '') ? 1 : 0)}</span>
                        </Button>
                        <div className="flex items-center text-secondary-text">
                          <MessageSquare size={16} className="mr-1" />
                          <span>{post.replies}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={savedPosts.includes(post.id || '') ? 'text-terracotta' : ''}
                        onClick={() => {
                          if (post.id) {
                            setSavedPosts(prev =>
                              prev.includes(post.id || '')
                                ? prev.filter(id => id !== post.id)
                                : [...prev, post.id]
                            );
                          }
                        }}
                      >
                        <Bookmark size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            {/* Trending Tags */}
            <Card className="bg-dark-container border-dark-container">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp size={20} className="mr-2 text-terracotta" />
                  {t('community.trendingTags')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="text-sm"
                      onClick={() => setDiscussionsSearchTerm(tag)}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-dark-container border-dark-container">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users size={20} className="mr-2 text-terracotta" />
                  {t('community.communityStats')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{t('community.totalPosts')}</span>
                    <span className="font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('community.activeUsers')}</span>
                    <span className="font-semibold">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('community.totalDiscussions')}</span>
                    <span className="font-semibold">{posts.reduce((acc, post) => acc + post.replies, 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
