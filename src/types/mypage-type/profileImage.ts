export type GetProfileImagePresignedUrlRequest = {
  file_name: string
}

export type GetProfileImagePresignedUrlResponse = {
  presigned_url: string
  img_url: string
  key: string
}

export type PatchProfileImageRequest = {
  profile_img_url: string
}

export type PatchProfileImageResponse = {
  detail: string
}
