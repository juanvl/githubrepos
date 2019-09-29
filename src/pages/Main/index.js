import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Container from 'components/Container';
import api from 'services/api';

import * as S from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repos: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const repos = JSON.parse(localStorage.getItem('repos')) || [];
    this.setState({ repos });
  }

  componentDidUpdate(_, prevState) {
    const { repos } = this.state;
    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInput = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repos } = this.state;

    try {
      if (repos.find(r => r.name === newRepo)) {
        throw new Error('Repositório duplicado');
      }

      const res = await api.get(`/repos/${newRepo}`);
      const data = {
        name: res.data.full_name,
      };
      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { newRepo, repos, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <S.Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Repositório (ex: facebook/react)"
            onChange={this.handleInput}
            value={newRepo}
          />
          <S.SubmitButton disabled={!newRepo} loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </S.SubmitButton>
        </S.Form>

        <S.List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repo/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </S.List>
      </Container>
    );
  }
}

export default Main;
