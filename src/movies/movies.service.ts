import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAllMovies(): Movie[] {
        return this.movies;
    }

    getByIdMovie(movieId): Movie {
        const movie = this.movies.find(movie => movie.id == +movieId);
        if (!movie) {
            throw new NotFoundException(`Not found Id movie: ${movieId}`);
        }

        return movie
    }

    getBySearch(searchYear): any {
        return this.movies.filter(search => searchYear == search.year);
    }

    removeMovie(id: string) {
        this.getByIdMovie(id);
        this.movies =  this.movies.filter(movie => movie.id !== +id);
    }

    createMovie(movieData: CreateMovieDto): Movie[] {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })

        return this.movies;
    }

    editMovie(id: string, updateData) {
        const movie = this.getByIdMovie(id);
        this.removeMovie(id);
        this.movies.push({...movie, ...updateData});
    }
}
