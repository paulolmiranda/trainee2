import { Body, Controller, Get, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time-dto';
import { UpdatePutTimeDto } from './dto/update-time-dto';
import { TimesService } from './times.service';


@Controller('times')
export class TimesController {

  constructor(private readonly timeService: TimesService){}

 @Post()
 async create(@Body() body: CreateTimeDto){
    const novoTime = await this.timeService.create(body);
      return {
      message: 'Time criado com sucesso',
      data: novoTime,
    }
 }

 @Get()
 findAll(@Body() body){
   return this.timeService.findAll()
 }

 @Get(':id')
async findOne(@Param('id', ParseIntPipe) id:number){
   return this.timeService.findOne(id);
 }

 @Put(':id')
 async update(@Param('id', ParseIntPipe) id:number, @Body() body : UpdatePutTimeDto){
   const timeAtualizado = await this.timeService.update(id, body)
  
  return {
      message: `Produto com ID ${id} atualizado com sucesso"`,
      data: timeAtualizado,
 }
}

 @Delete(':id')
 async remove(@Param('id', ParseIntPipe) id:number){
   return this.timeService.remove (id);
  
 }
}
