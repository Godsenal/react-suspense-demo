const baseUrl =  'https://api.github.com';

export const searchUsers = async (search) => {
  const { items } = await fetch(`${baseUrl}/search/users?q=${search}`).then(res => res.json());
  return items.map(data => { 
    const { login, id, avatar_url } = data;
    return { login, id, avatar_url };
  });
}

export const searchRepos = async (username) => {
  const repos = await fetch(`${baseUrl}/users/${username}/repos`).then(res => res.json());
  return repos;
}