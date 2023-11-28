package com.example.communityservice.dto;

public class DefaultPostDetailsFactory implements PostDetailsFactory {
    @Override
    public PostDetails createPostDetails(String author, long userId, String description, long upVote, long downVote) {
        return PostDetails.builder()
                .author(author)
                .userId(userId)
                .description(description)
                .upVote(upVote)
                .downVote(downVote)
                .build();
    }
}
