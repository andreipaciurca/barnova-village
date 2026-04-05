const axios = require('axios');
const fs = require('fs');
const path = require('path');

const WP_API_URL = 'https://primariabarnova.ro/wp-json/wp/v2';

async function fetchAllPosts() {
  let posts = [];
  let page = 1;
  let totalPages = 1;

  console.log('Fetching posts from Bârnova Website...');

  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        per_page: 10,
        page: page
      }
    });

    totalPages = parseInt(response.headers['x-wp-totalpages'], 10) || 1;
    posts = response.data;

    console.log(`Fetched page ${page} of ${totalPages}`);

    // Limit for POC: fetch first 2 pages
    while (page < Math.min(totalPages, 2)) {
      page++;
      const nextResponse = await axios.get(`${WP_API_URL}/posts`, {
        params: {
          per_page: 10,
          page: page
        }
      });
      posts = posts.concat(nextResponse.data);
      console.log(`Fetched page ${page} of ${totalPages}`);
    }

    const dataPath = path.join(__dirname, '../data/posts.json');
    if (!fs.existsSync(path.join(__dirname, '../data'))) {
        fs.mkdirSync(path.join(__dirname, '../data'));
    }
    fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
    console.log(`Successfully saved ${posts.length} posts to ${dataPath}`);

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchAllPosts();
