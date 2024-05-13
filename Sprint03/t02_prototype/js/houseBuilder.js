function houseBlueprint(address, description, owner, size) {
  this.address = address;
  this.date = new Date();
  this.description = description;
  this.owner = owner;
  this.size = size;
  this._building_speed = 0.5;
  this.getDaysToBuild = () => {
    return this.size / this._building_speed;
  };
}

function HouseBuilder(address, description, owner, size, roomCount) {
  this.roomCount = roomCount;
  houseBlueprint.call(this, address, description, owner, size);
}
