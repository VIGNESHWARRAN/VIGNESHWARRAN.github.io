const fs = require('fs');
const path = require('path');

const USERNAME = 'Vigneshwarran_S';
const OUTPUT_PATH = path.join(__dirname, '../public/stats.json');

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';
const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

async function updateLeetCodeStats() {
    try {
        console.log(`Fetching LeetCode stats for ${USERNAME}...`);

        const response = await fetch(LEETCODE_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query: QUERY,
                variables: { username: USERNAME }
            })
        });

        if (!response.ok) {
            throw new Error(`LeetCode API returned status ${response.status}`);
        }

        const data = await response.json();
        const statsList = data?.data?.matchedUser?.submitStats?.acSubmissionNum;

        if (!statsList) {
            throw new Error('User profile or submission data not found');
        }

        const stats = {
            totalSolved: statsList.find(s => s.difficulty === 'All')?.count ?? 0,
            easySolved: statsList.find(s => s.difficulty === 'Easy')?.count ?? 0,
            mediumSolved: statsList.find(s => s.difficulty === 'Medium')?.count ?? 0,
            hardSolved: statsList.find(s => s.difficulty === 'Hard')?.count ?? 0,
            lastUpdated: new Date().toISOString()
        };

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(stats, null, 2), 'utf-8');
        console.log('Successfully updated stats.json:', stats);
    } catch (error) {
        console.error('Failed to update stats:', error.message);
        process.exit(1);
    }
}

updateLeetCodeStats();