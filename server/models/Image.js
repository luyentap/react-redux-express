import mongoose, { Schema } from 'mongoose'

import { uploadFile, deleteFile } from '../middleware/s3'

const s3Path = `${process.env.APP_NAME}/images/image_`

const ImageSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    elevation: { type: Number, trime: true, default: 1 },
    flex: { type: String, trim: true, default: '1 1 auto' },
    margin: { type: String, trim: true },
    width: { type: String, trim: true }
  }
}, {
  timestamps: true
})

ImageSchema.pre('remove', function(next) {
  const image = this
  if (image.image && image.image.src) {
    deleteFile({ Key: image.image.src }).catch(err => console.error(err))
  }
  next()
})

const Image = mongoose.model('Image', ImageSchema)

export default Image
