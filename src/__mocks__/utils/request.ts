const user = {
  avatar_url: "https://avatars.githubusercontent.com/u/75891?v=4",
  html_url: "https://github.com/Ilia",
  id: 75891,
  name: "Ilia Mogilevsky",
  public_repos: 45,
};

const repos = [
  {
    id: 590235355,
    name: ".github",
    html_url: "https://github.com/Ilia/.github",
    description:
      "The GitHub landing page for Pact - The de-facto contract testing tool",
    forks_count: 0,
    stargazers_count: 0,
    language: null,
  },
  {
    id: 652932766,
    name: ".pactflow-github",
    html_url: "https://github.com/Ilia/.pactflow-github",
    description:
      "Pactflow - The most comprehensive contract testing platform. Worry less about testing and deploying distributed systems.",
    stargazers_count: 0,
    language: null,
    forks_count: 0,
  },
  {
    id: 16297877,
    name: "1Channel",
    html_url: "https://github.com/Ilia/1Channel",
    description: "1Channel.ch plugin for XBMC",
    stargazers_count: 1,
    language: "Python",
    forks_count: 0,
  },
];

export default async function fetchWithCache(url: string) {
  return new Promise((resolve) => {
    url.includes("/repos?") ? resolve(repos) : resolve(user);
  });
}
