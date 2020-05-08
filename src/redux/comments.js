import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
                            errMess: null,
                            comments: []
                            }, action) => {
                            switch (action.type) {
                                case ActionTypes.ADD_COMMENTS:
                                    return {...state, isLoading: false, errMess: null, comments: action.payload}
                                case ActionTypes.DISHES_FAILED:
                                    return {...state, isLoading: false, errMess: action.payload, comments: []}                                
                                case ActionTypes.ADD_COMMENT:
                                    var comment = action.payload;
                                    comment.id = state.length;
                                    comment.date = new Date().toISOString();
                                    console.log("Comment: " + comment);
                                    console.log("Comment date: " + comment.date);
                                    return {...state, comments: state.comments.concat(comment)};
                                default:
                                    return state;
                            }
}