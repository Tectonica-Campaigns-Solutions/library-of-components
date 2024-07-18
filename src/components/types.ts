import { IGatsbyImageData } from 'gatsby-plugin-image'
export interface Image {
  title?: string
  url: string
  alt?: string
  gatbyImageData: IGatsbyImageData
  width: number
  height: number
}