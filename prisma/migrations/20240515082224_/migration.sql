-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" DATETIME,
    "accessToken" TEXT NOT NULL,
    "userId" TEXT,
    "tryOn" BOOLEAN NOT NULL DEFAULT false,
    "tryOnPerProduct" INTEGER NOT NULL DEFAULT 10
);

-- CreateTable
CREATE TABLE "selectProdcutData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productImage" TEXT,
    "productShop" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "selectedFilnalProdcutData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productImage" TEXT,
    "productShop" TEXT NOT NULL
);
