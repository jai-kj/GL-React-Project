export interface INavLink {
    name: string
    url: string
}

export interface NavbarProps {
    navLinks: INavLink[]
    screen: number
    setScreen: Function
}

export interface IMovie {
    id: string
    title: string
    year: string
    genres: string[]
    ratings: number[]
    poster: string
    contentRating: string
    duration: string
    releaseDate: string
    averageRating: number
    originalTitle: string
    storyline: string
    actors: string[]
    imdbRating: number
    posterurl: string
}

export interface MovieItemProp {
    movie: IMovie
}
