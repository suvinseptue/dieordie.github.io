var Navigation = React.createClass({

    getInitialState: function () {
        return {innerHtml: {__html: "<div></div>"}}
    },

    componentDidMount: function () {
        $.ajax({
            url: "views/navigation.tml",
            dataType: "text"
        }).success(function (res) {
            this.setState({innerHtml: {__html: res}});
        }.bind(this));
    },

    render: function () {
        return (
            <div dangerouslySetInnerHTML={this.state.innerHtml}>
            </div>)
    }
});

var VideoList = React.createClass({
    getInitialState: function () {
        return {data: []}
    },
    componentDidMount: function () {
        $.ajax({
            url: "data/video.json",
            dataType: "json"
        }).success(function (res) {
            this.setState({data: res});
        }.bind(this));
    },
    render: function () {
        var shard = this.state.data;
        return (<ul className="container thumb-list">
            {
                shard.map(function (part, idx) {
                    return <VideoSection photos={part} index={idx}/>
                })
            }
            <Contact/>
        </ul>)
    },
    componentDidUpdate: function () {
        $('#contentList').fullpage({
            afterLoad: function (anchorLink, index) {
                ScrollBarStore.emitScroll(index);
            }
        });
        ScrollBarStore.emitScroll(0);
    }
});
var Contact = React.createClass({
    render: function () {
        return (<div className="section container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <h2 className="section-heading">Let's Get In Touch!</h2>
                    <hr className="primary"/>
                    <p>Wanna join our next trip? That's great! Give us a call or send us an email and we
                        will get back to you as soon as possible!</p>
                </div>
                <div className="col-lg-4 col-lg-offset-2 text-center">
                    <i className="fa fa-phone fa-3x sr-contact"></i>
                    <p>18516565014</p>
                </div>
                <div className="col-lg-4 text-center">
                    <i className="fa fa-envelope-o fa-3x sr-contact"></i>
                    <p><a href="mailto:suvinseptue@gmail.com">suvinseptue@gmail.com</a></p>
                </div>
            </div>
        </div>)
    }
});
var VideoSection = React.createClass({
    getInitialState: function () {
        return {loaded: false}
    }
    ,
    componentDidMount: function () {
        ScrollBarStore.onScroll(function (idx) {
            $(".video-info").css("opacity","100");
            if (idx == this.props.index && !this.state.loaded) {
                this.setState({data: this.props.photos, loaded: true})
            }
            setTimeout(function(){
                $(".video-info").css("opacity","0");
            },1000);
        }.bind(this));
    },
    thumbClick: function (evt) {
        var player = $(evt.target)[0];
        player.paused ? player.play() : player.pause();
    },
    render: function () {

        return <div className="section container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2 col-xs-12">
                    <a href="#thumbnail" className="thumbnail">
                        {(()=> {
                            if (typeof this.state.data != 'undefined') {
                                return (
                                    <div>
                                        <video onClick={this.thumbClick} style={{margin:"auto",width:"100%",height:"100%"}} loop is playsinline webkit-playsinline
                                               src={this.props.photos.Key} poster={this.props.photos.Poster}
                                               className="img-responsive"
                                        />
                                    </div>
                                )
                            }

                        })()
                        }
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="video-info text-center" style={{transition:"all .35s"}}>
                    <p>{this.props.photos.Title}</p>
                </div>
            </div>
        </div>
    }
});

ReactDOM.render(<Navigation />, document.getElementById('pageNav'));
ReactDOM.render(<VideoList />, document.getElementById('contentList'));
