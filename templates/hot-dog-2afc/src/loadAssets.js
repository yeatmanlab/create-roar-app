import jsPsychPreload from '@jspsych/plugin-preload';

// Create arrays of hot dog / not hot dog images
const numFiles = 5;
const hotDogFiles = Array.from(Array(numFiles), (_, i) => i + 1).map(
  (idx) => `https://storage.googleapis.com/roar-hot-dog-images/hotdog/${idx}.jpg`,
);

const notHotDogFiles = Array.from(Array(numFiles), (_, i) => i + 1).map(
  (idx) => `https://storage.googleapis.com/roar-hot-dog-images/nothotdog/${idx}.jpg`,
);

const allFiles = hotDogFiles.concat(notHotDogFiles);
export const allTargets = allFiles.map((url) => ({
  target: `<img src="${url}" width=250 height=250>`,
  isHotDog: !url.includes('nothotdog'),
}));

/* preload images */
export const preloadImages = {
  type: jsPsychPreload,
  images: allFiles,
};
