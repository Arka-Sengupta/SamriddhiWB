
import { useState } from 'react';
import { Plus, Search, ThumbsUp, MessageSquare, Clock, User, Users, Bookmark, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const posts = [
  {
    id: 1,
    title: "How to Price Handmade Products for Export Markets?",
    content: "I've been making traditional Bengali sarees and want to expand to international markets. What pricing strategies work best for handmade textiles?",
    author: "Meera Singh",
    avatar: "https://images.unsplash.com/photo-1581564018992-95e729d4940e?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: "2 hours ago",
    likes: 24,
    replies: 8,
    category: "Export",
    tags: ["pricing", "export", "textiles"]
  },
  {
    id: 2,
    title: "Digital Marketing Success Story - From Village to Viral",
    content: "Sharing my journey of how social media helped me grow my pottery business from local sales to nationwide orders. Happy to answer questions!",
    author: "Rajesh Kumar",
    avatar: "https://img.freepik.com/free-photo/front-view-smiley-man-with-headphones_23-2149915902.jpg?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: "4 hours ago",
    likes: 156,
    replies: 23,
    category: "Marketing",
    tags: ["digital-marketing", "success-story", "pottery"]
  },
  {
    id: 3,
    title: "Micro-finance Application Tips and Tricks",
    content: "Recently got approved for a business loan. Here are the documents and strategies that helped me secure funding for my handicraft workshop.",
    author: "Ananya Das",
    avatar: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: "6 hours ago",
    likes: 89,
    replies: 15,
    category: "Finance",
    tags: ["micro-finance", "loans", "documentation"]
  },
  {
    id: 4,
    title: "Quality Control for International Standards",
    content: "What quality measures should rural artisans implement to meet international export standards? Looking for practical advice.",
    author: "Suresh Pal",
    avatar: "https://img.freepik.com/free-photo/portrait-male-tourist-visiting-great-wall-china_23-2151261922.jpg?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: "1 day ago",
    likes: 67,
    replies: 12,
    category: "Quality",
    tags: ["quality-control", "standards", "export"]
  }
];

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
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [discussionsSearchTerm, setDiscussionsSearchTerm] = useState("");
  const { t } = useLanguage();

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
                                   post.author.toLowerCase().includes(discussionsSearchTerm.toLowerCase()) ||
                                   post.tags.some(tag => tag.toLowerCase().includes(discussionsSearchTerm.toLowerCase()));
    return matchesCategory && matchesSearch && matchesDiscussionsSearch;
  });

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const savedPostsList = posts.filter(post => savedPosts.includes(post.id));

  return (
    <div className="min-h-screen bg-dark-base">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-6 md:pb-8 bg-gradient-to-r from-dark-base to-dark-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-text mb-4">
              {t('community.title')}
            </h1>
            <p className="text-base md:text-lg text-secondary-text max-w-2xl mx-auto px-4 sm:px-0">
              {t('community.subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="text-center p-3 md:p-4 bg-dark-container rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-terracotta mb-1">2.5K+</div>
              <div className="text-xs md:text-sm text-secondary-text">{t('community.stats.members')}</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-dark-container rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-bengal-yellow mb-1">850+</div>
              <div className="text-xs md:text-sm text-secondary-text">{t('community.stats.discussions')}</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-dark-container rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-success-green mb-1">95%</div>
              <div className="text-xs md:text-sm text-secondary-text">{t('community.stats.responseRate')}</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-dark-container rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-primary-text mb-1">24h</div>
              <div className="text-xs md:text-sm text-secondary-text">{t('community.stats.avgResponse')}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Post Button */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text h-4 w-4 md:h-5 md:w-5" />
                <input
                  type="text"
                  placeholder={t('community.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 bg-dark-container border border-gray-600 rounded-lg text-primary-text placeholder-secondary-text focus:outline-none focus:border-terracotta text-sm md:text-base"
                />
              </div>
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white text-sm md:text-base">
                <Plus className="h-4 w-4 mr-2" />
                {t('community.newPost')}
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  size="sm"
                  className={`text-xs md:text-sm relative overflow-hidden group ${
                    selectedCategory === category.key 
                      ? "bg-terracotta hover:bg-terracotta/90 text-white" 
                      : "border-gray-600 text-secondary-text hover:text-primary-text hover:border-terracotta"
                  } ${selectedCategory !== category.key ? 'before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-red-600 before:transition-all before:duration-300 before:ease-out hover:before:w-full before:z-0' : ''}`}
                >
                  <span className="relative z-10">{category.label}</span>
                </Button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4 md:space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-dark-container border-gray-700 hover-lift">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <img 
                        src={post.avatar} 
                        alt={post.author}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-primary-text text-sm md:text-base">{post.author}</h3>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-terracotta/20 text-terracotta">
                              {post.category}
                            </span>
                          </div>
                          <div className="flex items-center text-secondary-text text-xs md:text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.timestamp}
                          </div>
                        </div>
                        
                        <h4 className="text-lg md:text-xl font-bold text-primary-text mb-2 cursor-pointer hover:text-terracotta transition-colors">
                          {post.title}
                        </h4>
                        
                        <p className="text-sm md:text-base text-secondary-text mb-4 line-clamp-2">
                          {post.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-dark-base px-2 py-1 rounded text-bengal-yellow">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 md:gap-6">
                            <button 
                              onClick={() => toggleLike(post.id)}
                              className="flex items-center gap-1 md:gap-2 text-secondary-text hover:text-terracotta transition-colors"
                            >
                              <ThumbsUp 
                                className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-terracotta text-terracotta' : ''}`} 
                              />
                              <span className="text-sm md:text-base">
                                {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                              </span>
                            </button>
                            <button className="flex items-center gap-1 md:gap-2 text-secondary-text hover:text-primary-text transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-sm md:text-base">{post.replies}</span>
                            </button>
                          </div>
                          <button 
                            onClick={() => toggleSave(post.id)}
                            className={`group relative overflow-hidden rounded-full p-2 transition-all duration-300 ease-out transform ${
                              savedPosts.includes(post.id)
                                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white scale-110 shadow-lg shadow-purple-500/50'
                                : 'text-secondary-text hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30'
                            } active:scale-95`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-0 transition-opacity duration-300 ${
                              savedPosts.includes(post.id) ? 'animate-pulse' : ''
                            }`} />
                            <Bookmark className={`h-4 w-4 relative z-10 transition-all duration-300 ${
                              savedPosts.includes(post.id) 
                                ? 'fill-current animate-bounce' 
                                : 'group-hover:rotate-12 group-hover:scale-110'
                            }`} />
                            {savedPosts.includes(post.id) && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Community Guidelines */}
              <Card className="bg-dark-container border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-primary-text flex items-center gap-2">
                    <Users className="h-5 w-5 text-terracotta" />
                    {t('community.guidelines.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm md:text-base text-secondary-text space-y-2">
                  <p>{t('community.guidelines.respectful')}</p>
                  <p>{t('community.guidelines.authentic')}</p>
                  <p>{t('community.guidelines.help')}</p>
                  <p>{t('community.guidelines.noSpam')}</p>
                  <p>{t('community.guidelines.tags')}</p>
                </CardContent>
              </Card>

              {/* Trending Tags */}
              <Card className="bg-dark-container border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-primary-text flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-bengal-yellow" />
                    {t('community.trending.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag, index) => (
                      <button
                        key={index}
                        className="text-xs md:text-sm bg-bengal-yellow/20 text-bengal-yellow px-2 py-1 rounded hover:bg-bengal-yellow/30 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-dark-container border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-primary-text">{t('community.quickActions.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-secondary-text hover:text-white text-sm md:text-base relative overflow-hidden group before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-red-600 before:transition-all before:duration-300 before:ease-out hover:before:w-full before:z-0">
                    <User className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">{t('community.quickActions.profile')}</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-secondary-text hover:text-white text-sm md:text-base relative overflow-hidden group before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-red-600 before:transition-all before:duration-300 before:ease-out hover:before:w-full before:z-0">
                    <MessageSquare className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">{t('community.quickActions.discussions')}</span>
                  </Button>
                  
                  {/* Search Discussions */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text h-4 w-4 z-10" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={discussionsSearchTerm}
                      onChange={(e) => setDiscussionsSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-dark-base border border-gray-600 rounded-lg text-primary-text placeholder-secondary-text focus:outline-none focus:border-terracotta text-sm"
                    />
                  </div>
                  
                  <Button 
                    onClick={() => setShowSavedPosts(true)}
                    variant="outline" 
                    className={`w-full justify-start border-gray-600 text-secondary-text hover:text-white text-sm md:text-base relative overflow-hidden group transition-all duration-300 ${
                      savedPosts.length > 0 
                        ? 'before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-gradient-to-r before:from-purple-600 before:to-pink-600 before:transition-all before:duration-300 before:ease-out hover:before:w-full before:z-0' 
                        : 'before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-red-600 before:transition-all before:duration-300 before:ease-out hover:before:w-full before:z-0'
                    }`}
                  >
                    <Bookmark className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">
                      {t('community.quickActions.saved')} {savedPosts.length > 0 && `(${savedPosts.length})`}
                    </span>
                    {savedPosts.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Posts Modal */}
      {showSavedPosts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-container border border-gray-700 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-text flex items-center gap-2">
                <Bookmark className="h-6 w-6 text-purple-500" />
                Saved Posts ({savedPosts.length})
              </h2>
              <button
                onClick={() => setShowSavedPosts(false)}
                className="text-secondary-text hover:text-primary-text transition-colors p-2 hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {savedPostsList.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark className="h-16 w-16 text-secondary-text mx-auto mb-4" />
                  <p className="text-secondary-text text-lg">No saved posts yet</p>
                  <p className="text-secondary-text/70 text-sm mt-2">Start saving posts by clicking the bookmark icon</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedPostsList.map((post) => (
                    <Card key={post.id} className="bg-dark-base border-gray-600 hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <img 
                            src={post.avatar} 
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-primary-text text-sm">{post.author}</h3>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-terracotta/20 text-terracotta">
                                {post.category}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-primary-text mb-2 cursor-pointer hover:text-terracotta transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-sm text-secondary-text line-clamp-2 mb-3">
                              {post.content}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 text-secondary-text text-sm">
                                  <ThumbsUp className="h-3 w-3" />
                                  {post.likes}
                                </span>
                                <span className="flex items-center gap-1 text-secondary-text text-sm">
                                  <MessageSquare className="h-3 w-3" />
                                  {post.replies}
                                </span>
                              </div>
                              <button
                                onClick={() => toggleSave(post.id)}
                                className="text-purple-500 hover:text-purple-400 transition-colors p-1"
                              >
                                <Bookmark className="h-4 w-4 fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Community;
