import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)


    const updateNews = async () => {
        props.setProgress(10);  //percentage loading bar to be loaded.
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles) //the no of articles fetched is stored in articles.
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    // useEffect function replaces componentDidMount in function based components.
    useEffect(() => {
        document.title = `NewsMonkey-${props.category}`
        updateNews()
    }, []);
    // The second parameter is to specify the event for which to listen...now its[] means it runs only once.

    // const componentDidMount= async()=> {
    /*an async function waits for the promises to be completed or resolved inside its body*/ 
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d497654e1e4041199c470a1fb721a453&page=1&pageSize=${props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    // });
    // console.log(this.state.page);
    // this.updateNews();
    // }
    // const handlePreviousClick = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d497654e1e4041199c470a1fb721a453&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false

        // })
        // await this.setState({ page: this.state.page - 1 })
    //     await setPage(page - 1)
    //     updateNews()
    // }

    // const handleNextClick = async () => {
    //     await setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {

        await setPage(page + 1)

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)


    }



    return (
        <>
            <h1 className='text-center' style={{ marginTop: '70px' }}>Top-Headlines</h1>
            {loading && <Spinner />}  {/**spiner on the starting page while loading */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className='row'>
                        {articles.map((element, index) => {
                            return <div className="col-md-4 my-3" key={index}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={new Date(element.publishedAt).toGMTString()} author={element.author ? element.author : "Unknown"} source={element.source.name} />
                            </div>

                        }

                        )}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>&larr; Previous  </button>

                    <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}



//  default props and propTypes are set at the end in function based components
News.defaultProps = {
    pageSize: 5,
    category: 'general',
    country: 'in'
}

News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
}

export default News
