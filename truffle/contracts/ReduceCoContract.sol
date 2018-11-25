pragma solidity ^0.4.24;

contract ReduceCoContract {
    struct CO2ReductionOffer {
        bytes32 coordinates;
        address owner;
        uint256 offerAmount;
        uint256 measurement;
    }

    struct OfferWithActualReduction {
        CO2ReductionOffer offer;
        uint256 reduction;
    }
    
    address dataSubmitter;
    uint256 fund;
    mapping(bytes32 => CO2ReductionOffer) offers;

    // Sorted from best offer to worse, with null offers at the end
    CO2ReductionOffer[10] top10Offers;
    
    constructor() public{
        fund = 0;
        dataSubmitter = msg.sender;
    }
    
    function depositFunds() public payable returns(bool) {
        require(msg.value > 0, "Value is 0");

        fund += msg.value;
        
        return true;
    }
    
    function getTop10Offers() public view returns(bytes32[10] memory, address[10] memory, uint256[10] memory , uint256[10] memory){
        address[10] memory owners;
        bytes32[10] memory coordinates;
        uint256[10] memory offerAmounts;
        uint256[10] memory measurements;

        for(uint i = 0; i < top10Offers.length; i++){
            owners[i] = top10Offers[i].owner;
            coordinates[i] = top10Offers[i].coordinates;
            offerAmounts[i] = top10Offers[i].offerAmount;
            measurements[i] = top10Offers[i].measurement;
        }
        
        return(coordinates, owners, offerAmounts, measurements);
    }

    function makeOffer(bytes32 coordinates, uint256 offerAmount, uint256 measurement) public returns(bool){
        require(
            offers[coordinates].owner == address(0), 
            "Offer already exists at that location!");

        CO2ReductionOffer memory newOffer = CO2ReductionOffer(coordinates, msg.sender, offerAmount, measurement);
        offers[coordinates] = newOffer;

        insertSortedTop10(newOffer);        

        return true;
    }

    // Sorted offer needs to be sorted from best to worse with remainders nulled
    function insertSortedMemory(OfferWithActualReduction[] memory sortedOffers, OfferWithActualReduction memory newOfferWithReduction) 
        internal pure returns(OfferWithActualReduction[] memory){
        // We need to track if the offer has been placed because all the next ones need to be shifted forward
        bool placedInArray = false;
        // Temp storage is needed to do an element shift over two for loop runs
        OfferWithActualReduction memory shiftStorage;

        for(uint i = 0; i < sortedOffers.length; i++){
            OfferWithActualReduction memory focusedOfferReduction = sortedOffers[i];
            CO2ReductionOffer memory focusedOffer = focusedOfferReduction.offer;

            if(placedInArray){
                sortedOffers[i] = shiftStorage;
                shiftStorage = focusedOfferReduction;

                if(focusedOffer.owner == address(0)){
                    // We found a null offer, meaning next ones all will be null. So we exit.
                    break;
                }
            }else if(newOfferWithReduction.offer.offerAmount < focusedOffer.offerAmount){
                // This offer is cheaper than the focused offer! Let's store it
                shiftStorage = focusedOfferReduction;
                sortedOffers[i] = newOfferWithReduction;
                placedInArray = true;
            }
        }

        return sortedOffers;
    }

    // Sorted offer needs to be sorted from best to worse with remainders nulled
    function insertSortedTop10(CO2ReductionOffer memory newOffer) 
        internal{
        // We need to track if the offer has been placed because all the next ones need to be shifted forward
        bool placedInArray = false;
        // Temp storage is needed to do an element shift over two for loop runs
        CO2ReductionOffer memory shiftStorage;

        for(uint i = 0; i < top10Offers.length; i++){
            CO2ReductionOffer memory focusedOffer = top10Offers[i];

            if(placedInArray){
                top10Offers[i] = shiftStorage;
                shiftStorage = focusedOffer;

                if(focusedOffer.owner == address(0)){
                    // We found a null offer, meaning next ones all will be null. So we exit.
                    break;
                }
            }else if(newOffer.offerAmount < focusedOffer.offerAmount){
                // This offer is cheaper than the focused offer! Let's store it
                shiftStorage = focusedOffer;
                top10Offers[i] = newOffer;
                placedInArray = true;
            }
        }
    }

    function submitData(bytes32[] memory coordinates, uint256[] memory measurements) public returns(bool){
        require(dataSubmitter == msg.sender, "You are not the verified data submitter!");
        require(coordinates.length == measurements.length, "Arrays do not have same length!");

        OfferWithActualReduction[] memory offersWithReduction = new OfferWithActualReduction[](coordinates.length);

        for(uint i = 0; i < coordinates.length; i++){
            CO2ReductionOffer memory focusedOffer0 = offers[coordinates[i]];
            uint256 reduction0 = focusedOffer0.measurement - measurements[i];

            if(reduction0 > 0){
                insertSortedMemory(offersWithReduction, OfferWithActualReduction(focusedOffer0, reduction0));
            }
        }

        for(uint j = 0; j < offersWithReduction.length; j++){
            OfferWithActualReduction memory focusedOffer1 = offersWithReduction[j];
            uint256 totalReductionReward = focusedOffer1.offer.offerAmount * focusedOffer1.reduction;
            uint256 payableReward;

            if(fund < totalReductionReward){
                payableReward = fund;
            }else{
                payableReward = totalReductionReward;
            }

            fund -= payableReward;
            focusedOffer1.offer.owner.transfer(payableReward);
        }

        return true;
    }
}