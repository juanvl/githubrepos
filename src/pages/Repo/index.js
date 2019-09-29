import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaSpinner,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from 'services/api';

import Container from 'components/Container';
import * as S from './styles';

class Repo extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repo: {},
    issues: [],
    loading: true,
    issueState: 'all',
    issuesLoading: true,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const name = decodeURIComponent(match.params.name);

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${name}`),
      api.get(`/repos/${name}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repo: repo.data,
      issues: issues.data,
      loading: false,
      issuesLoading: false,
    });
  }

  loadIssues = async (state, page) => {
    const { full_name } = this.state.repo;

    const res = await api.get(`/repos/${full_name}/issues`, {
      params: {
        state,
        page,
        per_page: 5,
      },
    });

    this.setState({
      issueState: state,
      issues: res.data,
      issuesLoading: false,
      page,
    });
  };

  handleFilterChange = async e => {
    this.setState({ issuesLoading: true });
    const state = e.target.value;
    this.loadIssues(state, this.state.page);
  };

  handlePagination = async n => {
    const { page, state } = this.state;
    if (n === -1 && page === 1) return;

    this.setState({ issuesLoading: true });

    let newPage = page + n;
    if (newPage < 1) newPage = 1;

    this.loadIssues(state, newPage);
  };

  render() {
    const { repo, issues, loading, issuesLoading, page } = this.state;

    if (loading) {
      return (
        <S.Loading>
          <FaSpinner color="purple" size={40} />
        </S.Loading>
      );
    }

    return (
      <Container>
        <Link to="/">
          <FaArrowLeft color="#000" size={20} />
        </Link>

        <S.Owner>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </S.Owner>

        <S.IssueList>
          <S.Filter>
            <select
              value={this.state.issueState}
              onChange={this.handleFilterChange}
            >
              <option value="all">Todas</option>
              <option value="open">Abertas</option>
              <option value="closed">Fechadas</option>
            </select>
          </S.Filter>

          {issuesLoading ? (
            <S.Loading issues={issuesLoading}>
              <FaSpinner color="purple" size={40} />
            </S.Loading>
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}

          <S.Pagination firstPage={page === 1}>
            <FaLongArrowAltLeft
              color={page === 1 ? '#ccc' : '#000'}
              size={30}
              onClick={() => this.handlePagination(-1)}
              id="left"
            />
            <FaLongArrowAltRight
              color="#000"
              size={30}
              onClick={() => this.handlePagination(1)}
            />
          </S.Pagination>
        </S.IssueList>
      </Container>
    );
  }
}

export default Repo;
