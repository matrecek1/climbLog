import { IsDefined, MinLength, MaxLength, IsString, IsNumber, Min, Max, IsNotEmpty, IsOptional } from "class-validator";

export type Grade = "6A" | "6A+" | "6B" | "6B+" | "6C" | "6C+"
    | "7A" | "7A+" | "7B" | "7B+" | "7C" | "7C+"
    | "8A" | "8A+" | "8B" | "8B+" | "8C" | "8C+"


export class CreateBoulderDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    @IsNotEmpty()
    @MinLength(2)
    grade: Grade;
    @IsNotEmpty()
    description: string;
}


export class BoulderUpdateDto {
    @IsOptional()
    @MinLength(3)
    name?: string;
    @IsOptional()
    @MinLength(2)
    grade?: Grade;
    @IsOptional()
    description?: string
}