package com.example.communityservice.dto;

public interface PostDetailsFactory {
    PostDetails createPostDetails(String author, long userId, String description, long upVote, long downVote);
}
