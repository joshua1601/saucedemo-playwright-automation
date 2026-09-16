export class CheckoutCalculation {
  private _itemPrices: number[] = [];
  private _displayedItemTotal = 0;
  private _tax = 0;
  private _displayedTotal = 0;

  set itemPrices(itemPrices: number[]) {
    this._itemPrices = itemPrices;
  }

  get itemPrices(): number[] {
    return this._itemPrices;
  }

  set displayedItemTotal(displayedItemTotal: number) {
    this._displayedItemTotal = displayedItemTotal;
  }

  get displayedItemTotal(): number {
    return this._displayedItemTotal;
  }

  set tax(tax: number) {
    this._tax = tax;
  }

  get tax(): number {
    return this._tax;
  }

  set displayedTotal(displayedTotal: number) {
    this._displayedTotal = displayedTotal;
  }

  get displayedTotal(): number {
    return this._displayedTotal;
  }

  get calculatedItemTotal(): number {
    return this._itemPrices.reduce((total, price) => total + price, 0);
  }

  get calculatedTotal(): number {
    return this.calculatedItemTotal + this._tax;
  }
}
