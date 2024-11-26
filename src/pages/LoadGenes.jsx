import { HttpAgent } from '@dfinity/agent';
import React, { useEffect } from 'react';
import { createActor } from '../Utils/createActor';
import { PAWS_ARENA_CANISTER } from '../Utils/constants';
import { idlFactory } from '../Utils/paws.did';
import { saveAs } from 'file-saver';

const HOST = "https://ic0.app";
const agent = new HttpAgent({ host: HOST, retryTimes: 10 });
let pawsarena = createActor(PAWS_ARENA_CANISTER, idlFactory, agent);

const LoadGenes = () => {

    useEffect(() => {
        const getData = async () => {
            let data = {};

            try {
                let array = [1, 2];
                let res1 = await pawsarena.getTokens();
                console.log("res1 :", res1);
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    
                }

                for (const de of res1) {
                    let res = await pawsarena.getMergedSVG(de[0]);
                    let filteredData = res.split(' ').filter(word => /\bid\b/.test(word));
                    let idValues = [...new Set(filteredData.map(item => {
                        let match = item.match(/id="([^"]+)"/);
                        return match ? match[1] : null;
                    }).filter(Boolean))]; // Remove null values and duplicates

                    data[de[0]] = idValues;
                    console.log("data :", de[0]);
                }






// "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"width: 1024px;height: 1024px;\" version=\"1.1\" id=\"generated1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 1024 1024\" xml:space=\"preserve\"><g id=\"bg3\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"bg_3\" data-name=\"bg#3\" width=\"1000\" height=\"1000\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAYAAABNo9TkAAAYD0lEQVR4nO3XMQGAQBDAsAOnyMEEVnkZ1yGR0K3X9z7/AAAAAKtu+QEAAGCfQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAEGDQAQAAIMCgAwAAQIBBBwAAgACDDgAAAAEGHQAAAAIMOgAAAAQYdAAAAAgw6AAAABBg0AEAACDAoAMAAECAQQcAAIAAgw4AAAABBh0AAAACDDoAAAAEGHQAAAAIMOgAAAAQYNABAAAgwKADAABAgEEHAACAAIMOAAAAAQYdAAAAAgw6AAAABBh0AAAACDDoAAAAsG1mDhc3CldiETGsAAAAAElFTkSuQmCC\"/>\n</g>\n</g><g id=\"kittycolor3\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"fur3\" x=\"125\" y=\"250\" width=\"750\" height=\"625\" href=\"data:image/png;base64,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\"/>\n</g>\n</g><g id=\"groundfront1\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"groundfront1\" x=\"834\" y=\"875\" width=\"114\" height=\"84\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAABUCAYAAABeKGNWAAABb0lEQVR4nO3csQnCQBxG8YtkCkEsnSFrOIq1pZ2dg9g5w81gKYJrxA30O0iIPN+vDnfq45o/8bpxHIs+u53X0Y90fzb9kF3y0OHyihZbNW2tn2VICENCGBLCkBCGhDAkhCEhDAlhSIhFR3TDMMyxeTT6Ou4f8d7p6G23SVcs5XTd5g8HPJEQhoQwJIQhIQwJYUgIQ0IYEsKQED3tC6UTm5YXpdKJTePLV5PyREIYEsKQEIaEMCSEISEMCWFICENCGBKC+PLVX/JEQhgSwpAQhoQwJIQhIQwJYUgIQ0IYEsKQEIaEMCSEISEMCWFICENCGBLCkBCGhFj6/5HRLVX6zhMJYUgIQ0IYEsKQEIaEMCSEISEMCYG7+SrVcqd5OoGa+p7yFp5ICENCGBLCkBCGhDAkhCEhDAlhSIj+dl5Pfgd4Ogmp9RUtln7Glr3nuNO81povOjFPJIQhIQwJYUgIQ0IYEsKQEIaEMCSEIQlKKW8V1TCddVkutQAAAABJRU5ErkJggg==\"/>\n</g>\n</g><g id=\"tail2\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"tail2\" x=\"125\" y=\"73\" width=\"209\" height=\"375\" href=\"data:image/png;base64,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\"/>\n</g>\n</g><g id=\"back2\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"back2\" x=\"323\" y=\"282\" width=\"94\" height=\"156\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAACcCAYAAAD28hzRAAAC60lEQVR4nO3dv2oUURxH8bm7WwRBQVgiBIXZMpa+QyohRElhn8JnSpF6TZU/lnkN+21SGAzYCcLOjGht8R2cy0nkfOofs5uT28zcnZkyDEMztdVqNf1BWSX99M1mE83NHmWG/4DhIYaHGB5ieIjhIYaHGB5ieMiC/gI3y2U09+TkJJr7cXYWf/bB/X08OzVXPMTwEMNDDA8xPMTwEMNDDA8xPMTwkFqb3WPGsY3xm+Uy2sQec2nBze4HzvAQw0MMDzE8xPAQw0MMDzE8pNZmd3w2en15GU5uo6nZbJ5+dHNw+C79nvHPtFOueIjhIYaHGB5ieIjhIYaHGB5ieMioPdf0xuGri4v4mKV04Vx28lhKvpb6Pjvm4dFRfMz0LNcVDzE8xPAQw0MMDzE8xPAQw0MMDzE8pLRtG18zOF+vo7mdnen30GezbI282N2Nj/n17i6a22b77H+8Pz6O5lzxEMNDDA8xPMTwEMNDDA8xPMTwEPyZZKm+76PJ7TbbPG9GbKDXuAfaFQ8xPMTwEMNDDA8xPMTwEMNDDA8xPGTUJYMS3l1NXomo8Yy1GlzxEMNDDA8xPMTwEMNDDA8xPMTwkCqnmG+/3GJ/0IeXP+PZT7ffornr/Vf/8I3+zhUPMTzE8BDDQwwPMTzE8BDDQwwPwX+mffo8+9+ne6lPy4gz13hyeq54iOEhhocYHmJ4iOEhhocYHmJ4iOEh+CWDj9+zO7ZTb5ppj1eLKx5ieIjhIYaHGB5ieIjhIYaHGB5S5cz18+s97A+az/NXR3d7z6K5Gvcsu+IhhocYHmJ4iOEhhocYHmJ4iOEhhodUuWSQPnK8GfFirVTX5Y8xH4b88sLUXPEQw0MMDzE8xPAQw0MMDzE8xPCQUWeuQzjedemLrX7Pkk+/zp4OvlhUeBX25EeU4R8yw0MMDzE8xPAQw0MMDzE8xPCQ0rbtmE9+HG+3Ap2v19H1Elc8xPAQw0MMDzE8xPAQw0MMDzE8oWmaX5/0YxRr9nk4AAAAAElFTkSuQmCC\"/>\n</g>\n</g><g id=\"eyes1\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"eyes1\" x=\"532\" y=\"469\" width=\"218\" height=\"31\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAfCAYAAACBONPcAAAAiElEQVR4nO3T0QmAMBAFwcT+e47YgT9uwMw08OC4nWutNTaZc+6afrwe33iiPzry365ty3AQoUFAaBAQGgSEBgGhQUBoEBAaBIQGAaFBQGgQEBoEhAYBoUFAaBAQGgSEBgGhQUBoEBAaBIQGAaFBQGgQEBoEhAYBoUFAaBAQGgSEBgGhwdfGGDfBxQg9NipXeQAAAABJRU5ErkJggg==\"/>\n</g>\n</g><g id=\"hat33\"><g width=\"1000\" height=\"1000\" viewBox=\"0 0 1000 1000\">\n  <image id=\"hat33\" x=\"428\" y=\"219\" width=\"385\" height=\"177\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYEAAACxCAYAAAAiVAE9AAACzUlEQVR4nO3d0W2EMBBAQRO5GPpv0CnhFEWn5e7NNIDBoKf9QL7u+1482rE98HZX9RH/PGANAAwRAYAwEQAIEwGAMBEACBMBgDARAAgTAYAwEQAIEwGAMBEACBMBgDARAAgTAYAwEQAIEwGAMBEACBMBgDARAAgTAYAwEQAIEwGAMBEACBMBgDARAAgTAYAwEQAIEwGAMBEACBMBgLBt8186D18f8H/T3/k1dWGTAECYCACEiQBAmAgAhIkAQJgIAISJAECYCACEiQBAmAgAhIkAQJgIAISJAECYCACEiQBAmAgAhIkAQJgIAISJAECYCACEiQBAmAgAhIkAQJgIAISJAECYCACEiQBAmAgAhIkAQJgIAISJAEDYtvkA487UAkwCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAELY/5NbPA9YA8HVMAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYXv4b9zLywcwxyQAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGH7D4e9v+NA+slD7gHyTAIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQJgIAYSIAECYCAGEiABAmAgBhIgAQttdaZ/D2Ly8fwByTAECYCACEiQBAmAgAhIkAQJgIAISJAECYCACEiQBAmAgAhIkAQJgIAISJAECYCACEiQBAmAgAhIkAQJgIAISJAECYCABUrbV+AZcsCuJa/QBcAAAAAElFTkSuQmCC\"/>\n</g>\n</g>\n </svg> \n ",













console.log("LoadGenes.jsx :",data);

                // Convert data to a Blob and save it
                const blob = new Blob([`const genes = ${JSON.stringify(data, null, 2)};\nexport default genes;`], { type: 'application/javascript' });
                saveAs(blob, 'genes.js');

                // Log the file contents
                const reader = new FileReader();
                reader.onload = function (e) {
                    console.log("data loaded :");
                };
                reader.readAsText(blob);

            } catch (error) {
                console.log("error in getting gene data :", error);
            }
        };

        getData();
    }, []);

    return (

        <div className='flex flex-col text-white h-screen justify-center items-center w-full'>
            loadGenes



        </div>
    );
};

export default LoadGenes;