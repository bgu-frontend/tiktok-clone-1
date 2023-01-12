export default {
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference', // connect to different docs
  to: [{type: 'user'}], // reference to array of users
}
