# dtractjs
A contract and data mapping library for managing and handling data systems interactions

Dtractjs is build around the idea that data is going to be either sent to or received from a data service.  In order to ensure data is handled correctly and adheres to a DTO, dtractjs will take a contract object and map data through it.

Any data that is not explicitly detailed in the contract object will be discarded from the final contract application. Any data object that does not adhere to the requirements of the contract will cause an error.

Upcoming enhancements:

- [ ] remap will handle nullable fields which are potentially missing from data object
- [ ] remap will throw an error if the data object cannot fulfill the map requirements
