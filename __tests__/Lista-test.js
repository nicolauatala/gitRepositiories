import React from 'react';
import Lista from '../src/pages/Lista';
import api from "../src/services/api";

import renderer from 'react-test-renderer';

beforeAll(() => { 
    jest.mock('@react-native-community/async-storage');
});

it('renders correctly', () => {
    const tree = renderer.create(<Lista />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('works with async/await', async () => {
    const response = await api.get(`/repos/nicolauatala/punkbeer`);
    const { owner, name } = response.data;
    expect(owner.login).toEqual('nicolauatala');
    expect(name).toEqual('punkBeer');
});