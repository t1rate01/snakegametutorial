import firebase from 'firebase/app';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { firebaseConfig } from '../../config';

interface HighScoreEntry {
    username: string;
    score: number;
  }

const firebaseConff = firebaseConfig;
  

const database = getDatabase();
initializeApp(firebaseConff);

const postHighScore = async (username: string, score: number) => {
    try {
      const highScoreRef = ref(database, 'highScores/' + username);
      await set(highScoreRef, {
        username,
        score
      });
      console.log('High score saved to Firebase');
    } catch (error) {
      console.error('Error posting high score to Firebase', error);
    }
};


const getHighScoresFromFirebase = async (): Promise<HighScoreEntry[]> => {
    try {
      const highScoresRef = ref(database, 'highScores');
      const snapshot = await get(highScoresRef);
      
      if (snapshot.exists()) {
        const highScores = snapshot.val();
        const highScoresArray: HighScoreEntry[] = Object.entries(highScores).map(([username, scoreData]) => {
          const scoreEntry: HighScoreEntry = scoreData as HighScoreEntry;
          return {
            username,
            score: scoreEntry.score
          };
        });
        highScoresArray.sort((a, b) => b.score - a.score);
        
        console.log('High scores retrieved:', highScoresArray);
        return highScoresArray;
      } else {
        console.log('No high scores available.');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving high scores from Firebase', error);
        return [];
    }
  };
  
  export { postHighScore, getHighScoresFromFirebase };