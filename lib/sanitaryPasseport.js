'use strict';

const { Contract } = require('fabric-contract-api');

class SanitaryPasseport extends Contract {

    async queryPasseport(ctx, passeportNumber) {
        const passeportAsBytes = await ctx.stub.getState(passeportNumber);
        if (!passeportAsBytes || passeportAsBytes.length === 0) {
            throw new Error(`${passeportNumber} does not exist`);
        }
        console.log(passeportAsBytes.toString());
        return passeportAsBytes.toString();
    }

    async changeUserPasseport(ctx, passeportNumber, vaccinNumber, vaccinType) {

        const passeportAsBytes = await ctx.stub.getState(passeportNumber);
        if (!passeportAsBytes || passeportAsBytes.length === 0) {
            throw new Error(`${passeportNumber} does not exist`);
        }
        const passeport = JSON.parse(passeportAsBytes.toString());
        passeport.vaccinNumber = vaccinNumber;
        passeport.vaccinType = vaccinType;

        await ctx.stub.putState(passeportNumber, Buffer.from(JSON.stringify(passeport)));

    }

}

module.exports = SanitaryPasseport;