/* eslint-disable no-plusplus */
// NOTE: replace 'AFWXkxxGnaatTRFwR72jeFW5cZ83' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "RwmrAp3tqNThORz3r5uTPPkWcvb2",
      username: "Ayush",
      fullName: "Ayush Singh",
      emailAddress: "ayush@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "Dipali",
      fullName: "Dipali Mankotia",
      emailAddress: "dipali@yahoo.com",
      following: [],
      followers: ["RwmrAp3tqNThORz3r5uTPPkWcvb2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "Abhishek",
      fullName: "Abhishek Maggo",
      emailAddress: "abhishek@maggo.com",
      following: [],
      followers: ["RwmrAp3tqNThORz3r5uTPPkWcvb2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "Chinki",
      fullName: "Chinki",
      emailAddress: "chinki@gmail.com",
      following: [],
      followers: ["RwmrAp3tqNThORz3r5uTPPkWcvb2"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/ayush/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "Dipali",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "abhishek",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
