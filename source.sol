// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Text {
    bytes32 public text;

    function getText() public view returns (bytes32 t) {
        t = text;
    }

    function setText(bytes32 t) public {
       text = t;
    }
}