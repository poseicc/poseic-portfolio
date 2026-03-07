import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';

// NOTE: Replace this with your actual GitHub username
const GITHUB_USERNAME = 'rtrgjtnjiofdlkewdbrfhug'; 

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
}

export const GithubRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`);
        if (response.ok) {
          const data = await response.json();
          // Check if data is actually an array to avoid crashes if API returns an error object
          if (Array.isArray(data)) {
             setRepos(data);
          } else {
             console.error("Github API returned non-array:", data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch repos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return null;

  // Render nothing if no repos found or error occurred
  if (repos.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-20 md:mt-32">
        <div className="flex items-center gap-3 mb-8 px-2">
            <Github className="text-white/60" size={24} />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Açık Kaynak <span className="text-white/40">Kütüphanesi</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, index) => (
                <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all h-[200px]"
                >
                    <div>
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-lg text-white group-hover:text-accent transition-colors truncate pr-4">
                                {repo.name}
                            </h4>
                            <ExternalLink size={16} className="text-white/20 group-hover:text-white transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                            {repo.description || "No description provided."}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-xs text-white/50">
                        <div className="flex items-center gap-4">
                             {repo.language && (
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-accent/70" />
                                    {repo.language}
                                </span>
                             )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                                <Star size={14} /> {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                <GitFork size={14} /> {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </motion.a>
            ))}
        </div>
    </div>
  );
};