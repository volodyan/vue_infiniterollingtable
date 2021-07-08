/**
 * Пример сервиса
 */
import webClient from '@/middleware/WebClient';
import AxiosUrl from "@/middleware/services/AxiosUrl";

export default {
    loadExamples() {
        return webClient.get('example');
    },
    loadExample(id) {
        return webClient.get('example', { id });
    },
    createExample(data) {
        return webClient.post('example', data);
    },
    updateExample(data) {
        return webClient.put('example', data);
    },
    deleteExample(id) {
        return webClient.delete('example', { id });
    },

    /******* demo ****** */
    GetTotalWaterFlow() {
        return webClient.post(AxiosUrl.baseUrlPath + 'GetTotalWaterFlow');
    },
    GetWaterworksName() {
        return webClient.post(AxiosUrl.baseUrlPath + 'GetWaterworksName');
    },

};