import { model, Schema } from "mongoose";

const courseRatingSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  value: {
    type: Number, 
    min: 1,
    max: 5,
  },
}, { _id: false }); 

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    typeOfCourse: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Data Science",
        "Data Analytics",
        "UI/UX",
        "Full Stack",
        "Mobile Dev",
        "DevOps",
        "Cloud",
        "AI/ML",
        "Cybersecurity",
        "Blockchain",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    curriculum: [{
      type: Schema.Types.ObjectId,
      ref: "Lesson"
    }],
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    offer: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    finalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'ownerModel'
    },
    ownerModel: {
      type: String,
      required: true,
      enum: ['Admin', 'Teacher']
    },
    purchases: [{
      type: Schema.Types.ObjectId,
      ref: "Purchase",
    }],
    ratings: [courseRatingSchema],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


courseSchema.post('init', async function() {
  try {
    const indexes = await Course.collection.getIndexes();
    if (indexes['curriculum.lessons.title_1']) {
      console.log('Removing problematic index: curriculum.lessons.title_1');
      await Course.collection.dropIndex('curriculum.lessons.title_1');
    }
  } catch (error) {
    console.log('Index cleanup completed or not needed');
  }
});


courseSchema.pre('save', function(next) {
  if (this.isModified('basePrice') || this.isModified('offer')) {
    this.finalPrice = this.basePrice - (this.basePrice * this.offer / 100);
  }
  next();
});


courseSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    return;
  }
  
  const sum = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
  this.averageRating = parseFloat((sum / this.ratings.length).toFixed(1));
};

export const Course = model("Course", courseSchema);