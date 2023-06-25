import axios from "axios";
import { useEffect, useState } from "react";


const AutoSuggestSearch = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [suggestions, setSuggestions] = useState([]);
  // useEffect(()=>{
  //   axios.get('http://localhost:5000/dashboard/customer')
  //   .then(res=>{
  //     console.log(res);
  //     setSuggestions(res.data.Reuslt);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // },[])
  // // Function to handle the search term change
  // const handleSearchTermChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // // Function to handle the selection of a suggestion
  // const handleSuggestionSelect = (selectedSuggestion) => {
  //   // Do something with the selected suggestion
  //   console.log('Selected suggestion:', selectedSuggestion);
  //   setSearchTerm('');
  // };

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       value={searchTerm}
  //       onChange={handleSearchTermChange}
  //       placeholder="Search..."
  //     />
  //     <ul>
  //       {suggestions
  //         .filter((suggestion) =>
  //           suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
  //         )
  //         .map((suggestion, index) => (
  //           <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
  //             {suggestion.name}
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
};

export default AutoSuggestSearch;
