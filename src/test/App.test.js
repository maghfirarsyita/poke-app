import { render, screen } from '@testing-library/react';
import Content from '../App';
import ListPage from '../Components/PokemonList';
import DetailPage from '../Components/PokemonDetail';
import MyListPage from '../Components/PokemonMyList';

test('Successfully renders', () => {
  const div = document.createElement('div');
  render(<Content />);
  setTimeout(() => {
    unmountComponentAtNode(div);
  }, 2000);
});

test('Success render App', async () => {
  render(<Content />);
  const navigations = await screen.findAllByRole('navigation');
  const pokemonLogo = await screen.findByTestId('pokemon-logo');
  expect(pokemonLogo).toBeTruthy();
  expect(navigations).toHaveLength(2);
});

test('Success render PokemonList', async () => {
  render(<ListPage />);
  const content = await screen.findByTestId('list-page');
  expect(content).toBeTruthy();
});

test('Success render PokemonDetail and name', async () => {
  render(<DetailPage detailNumber={2} detailNickname="juju"/>);
  const content = await screen.findByTestId('detail-page');
  const pokemonNameSection = await screen.findByTestId('pokemon-name');
  expect(pokemonNameSection).toBeTruthy();
  expect(content).toBeTruthy();
});

test('Success render PokemonMyList', async () => {
  render(<MyListPage />);
  const content = await screen.findByTestId('my-list');
  expect(content).toBeTruthy();
});