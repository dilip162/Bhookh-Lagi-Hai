/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { menu_url } from "../../items/Constant";

export const useRestaurantMenu = (id) => {
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [menu, setMenu] = useState({});
  const [category, setCategory] = useState({});
  useEffect(() => {
    getRestaurantInfo();
   
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      'https://corsproxy.org/?'+ encodeURIComponent(menu_url + id)
    );
  
    if (!data.ok)
      throw new Error("Something went wrong with fetching restaurants");
    const json = await data.json();
    console.log(json)
   
    setRestaurantMenu(json.data?.cards[0]?.card?.card?.info);   
    setMenu(
      json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards
    );

    const cat =
      await json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c?.card?.card?.["@type"] ==
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    setCategory(cat);
  }

  return { restaurantMenu, menu, category };
};
