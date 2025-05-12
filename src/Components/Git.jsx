import React, { useState } from 'react';

const Git = () => {
    const [username, setUsername] = useState('');
    const [githubData, setGithubData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    const fetchData = async (e) => {
        if (e.key === 'Enter') {
            try {
                const res = await fetch(`https://api.github.com/users/${username}`);
                const data = await res.json();

                if (data.message === 'Not Found') {
                    alert('User not found');
                    return;
                }

                const repoRes = await fetch(data.repos_url);
                const repoData = await repoRes.json();

                setGithubData(data);
                setRepos(repoData);
                setShowProfile(true);
                setUsername('');
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className='body'>
            <div className='input-box'>
                <input
                    type='text'
                    className='input'
                    placeholder='Enter GitHub username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={fetchData}
                />
            </div>

            {showProfile && githubData && (
                <div className='github-data'>
                    <div className='main-container'>
                        <div className='container'>
                            <div className='avtar'>
                                <img src={githubData.avatar_url} alt='Avatar' />
                            </div>
                            <div className='username'>{githubData.login}</div>
                            <div className='content'>
                                <button>
                                    <a href={githubData.html_url} target='_blank' rel='noreferrer'>Profile</a>
                                </button>
                                <div className='bio'>{githubData.bio}</div>
                                <div className='followdata'>
                                    <div className='followers'>Followers: {githubData.followers}</div>
                                    <div className='following'>Following: {githubData.following}</div>
                                </div>
                                <div className='repo'>
                                    Public Repositories: {githubData.public_repos}
                                </div>
                            </div>
                        </div>

                        {/* Repositories Table */}
                        <div className='container2'>
                            <h2 className='totalrepo'>Repositories (Total: {repos.length})</h2>
                            
                            <table className='repo-table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Forks</th>
                                        <th>Open Issues</th>
                                        <th>Watchers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {repos.map((repo) => (
                                        <tr key={repo.id}>
                                            <td>
                                                <a href={repo.html_url} target='_blank' rel='noreferrer'>
                                                    {repo.name}
                                                </a>
                                            </td>
                                            <td>{repo.forks}</td>
                                            <td>{repo.open_issues}</td>
                                            <td>{repo.watchers}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    );
};

export default Git;
