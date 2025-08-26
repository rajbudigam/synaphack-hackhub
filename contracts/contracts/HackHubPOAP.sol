// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * ERC-721 with EIP-5192 (Minimal Soulbound) locked tokens.
 * Non-transferable once minted. Only owner can mint/burn.
 */
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// EIP-5192 interface
interface IERC5192 {
    /// @notice Emitted when token is locked.
    event Locked(uint256 tokenId);
    /// @notice Emitted when token is unlocked (not used).
    event Unlocked(uint256 tokenId);
    /// @notice Returns true if token is Soulbound (locked).
    function locked(uint256 tokenId) external view returns (bool);
}

contract HackHubPOAP is ERC721URIStorage, Ownable, IERC5192 {
    error Soulbound();
    uint256 public nextId = 1;
    mapping(uint256 => bool) private _locked;

    constructor(address initialOwner) ERC721("HackHub POAP", "HPOAP") Ownable(initialOwner) {}

    function locked(uint256 tokenId) external view override returns (bool) {
        return _locked[tokenId];
    }

    function mintTo(address to, string memory tokenURI_) external onlyOwner returns (uint256) {
        uint256 id = nextId++;
        _safeMint(to, id);
        _setTokenURI(id, tokenURI_);
        _locked[id] = true;
        emit Locked(id);
        return id;
    }

    // forbid transfers (soulbound)
    function _update(address to, uint256 tokenId, address auth)
        internal override(ERC721)
        returns (address)
    {
        address from = super._ownerOf(tokenId);
        if (from != address(0) && to != address(0)) revert Soulbound();
        return super._update(to, tokenId, auth);
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
        _locked[tokenId] = false;
        // (EIP-5192 doesn't require Unlocked on burn, but it's okay to omit)
    }
}
