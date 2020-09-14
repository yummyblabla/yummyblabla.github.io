const API_URL = 'https://comp4537-node-server.herokuapp.com';

export const getScores = async () => {
  try {
    const response = await fetch(
      `${API_URL}/scores`,
    );
    const result = await response.json();
    return result.scores;
  } catch (err) {
    return [];
  }
};

export const sendScore = async (username, score) => {
  try {
    const response = await fetch(
      `${API_URL}/scores`, {
        method: 'POST',
        body: JSON.stringify({ username, score }),
      },
    );
    const result = await response.json();
    return result.success;
  } catch (err) {
    return true;
  }
};
