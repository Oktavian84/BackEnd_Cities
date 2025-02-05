export type CreateCity = {
    img_url: string;
    city_name: string;
    city_location: string;
    city_population?: string;
    city_description?: string;
}

export type UpdateCityData = Partial<CreateCity>;
