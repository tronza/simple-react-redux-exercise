// Actions
const BASE_STRING = 'my-app/blog-posts/';

const SET_SELECTED_POST = BASE_STRING + 'SET_SELECTED_POST';

const initialState = {
    posts: [
        {
            id: 1,
            title: 'Hello world!',
            text: 'This magnificient application has been built successfully.',
            author: 'Kulju',
            created: '18.04.2017 16:59:59',
        },
        {
            id: 2,
            title: 'This page should have multiple blog posts.',
            text: "This page should have multiple blog posts. I don't have anything to say here really. Just a placeholder.",
            author: 'Kulju',
            created: '18.04.2017 17:08:00',
        },
    ],
    selectedPostId: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_SELECTED_POST:
            return {
                ...state,
                selectedPostId: action.selectedPostId
            };

        default:
            return state;
    }
}

// TODO: Implement listing page for these all, which should contain following features:
// 1) List all posts with just a title, author and created date and "Expand"-button (you don't need internal component state for this ;-))
// 2) By clicking expand, you can review the whole blog post
//
// BONUS:
// 3) Add "Remove"-button which can delete posts from store
// 4) Add a form that handles adding a new posts in the store
//
// SUPERBONUS:
// 5) Create a docker container for the redux-koulutus -application
// 6) Configure a Kubernetes-cluster for handling docker containers