export const getTrendingTopics = (news: any[]) => {
  if (!news.length) return [];
  
  const allTags = news.flatMap(item => item.tags || []);
  const tagCount = allTags.reduce((acc: Record<string, number>, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(tagCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([tag]) => tag);
};

export const getMostPopularPost = (news: any[]) => {
  if (!news.length) return null;
  return [...news].sort((a, b) => {
    const aMetric = a.type === "tweet" ? (a.likes || 0) : (a.stars || 0);
    const bMetric = b.type === "tweet" ? (b.likes || 0) : (b.stars || 0);
    return bMetric - aMetric;
  })[0];
};