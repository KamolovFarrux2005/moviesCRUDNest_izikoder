import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {MoviesService} from "./movies.service";
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
@Controller('movies')
export class MoviesController {
    constructor(readonly moviesService: MoviesService){}
    @Get()
    getAll(): Movie[] { 
        return this.moviesService.getAllMovies()
    }

    @Get('search')
    search(@Query('year') searchingYear: string): Movie[]{
        return this.moviesService.getBySearch(searchingYear);
    }

    @Get('/:id')
    getOne(@Param('id') id: string): Movie{
        return this.moviesService.getByIdMovie(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto): Movie[] {
        return this.moviesService.createMovie(movieData)
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.moviesService.removeMovie(id);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData: UpdateMovieDto){
       return this.moviesService.editMovie(movieId, updateData)
    }
}
