"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { bathroomsOptions, bedroomsOptions, categoryOptions, seasonOptions } from "@/constant";
import { filterParams } from "@/lib/validation";


interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  placeHolder?: string;
}

const Filter = () => {

  const form = useForm<z.infer<typeof filterParams>>({
    resolver: zodResolver(filterParams),
    defaultValues: {
      catagories: "",
      season: "",
      bathrooms : "",
      bedrooms : ""
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  

  const handleUpdateParams = (key: string, value: string) => {
    const currentQuery = searchParams.toString();
    const queryParameters = new URLSearchParams(currentQuery);

    queryParameters.set(key, value.toLowerCase());

    const newUrl = `${window.location.pathname}?${queryParameters.toString()}`;

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative flex  w-[500px] gap-5 p-2 lg:w-[500px]`}>
      <Form {...form}>
      <FormField
                control={form.control}
                name="catagories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select catagories </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleUpdateParams("catagories", value);
                      }}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[350px]">
                        {categoryOptions.map((data, index) => (
                          <SelectItem key={index} value={data.value}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                   
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select season</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleUpdateParams("season", value);
                      }}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[350px]">
                        {seasonOptions.map((data, index) => (
                          <SelectItem key={index} value={data.value}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                   
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select bedrooms</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleUpdateParams("bedrooms", value);
                      }}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[350px]">
                        {bedroomsOptions.map((data, index) => (
                          <SelectItem key={index} value={data.value}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                   
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select bathrooms</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleUpdateParams("bathrooms", value);
                      }}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[350px]">
                        {bathroomsOptions.map((data, index) => (
                          <SelectItem key={index} value={data.value}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                   
                  </FormItem>
                )}
              />
      </Form>
    </div>

  );
};

export default Filter;
