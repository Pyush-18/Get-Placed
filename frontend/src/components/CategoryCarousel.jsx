import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Graphic Designer",
  "FullStack Developer",
  "Data Science",
];

function CategoryCarousel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchHandler = (query) => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-16">
        <CarouselContent className="flex space-x-2">
          {category?.map((data, idx) => (
            <CarouselItem key={idx} className="basis-1/3 lg:basis-1/3">
              <Button onClick={() => searchHandler(data)} className="rounded-full  dark:text-white" variant="outline">
                {data}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
