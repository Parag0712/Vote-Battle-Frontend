"use client";
import { getImageUrl } from "@/lib/utils";
import { ClashType } from "@/types";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { Textarea } from "../ui/textarea";
import socket from "@/lib/socket";
import { toast } from "sonner";

const Clashing = ({ clash }: { clash: ClashType }) => {
  const [hideVote, setHideVote] = useState(false);
  const [clashItems, setClashItems] = useState(clash.ClashItem);
  const [clashComments, setClashComments] = useState(clash.ClashComments);
  const [comment, setComment] = useState("");

  const handleVote = (id: number) => {
    if (clashItems && clashItems.length > 0) {
      setHideVote(true);
      updateCounter(id);
      // Socket Listen
      socket.emit(`clashing-${clash.id}`, {
        clashId: clash.id,
        clashItemId: id,
      });
    }
  };

  const updateCounter = (id: number) => {
    const items = [...clashItems!];
    const findIndex = clashItems?.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      items[findIndex!].count += 1;
    }
    setClashItems(items);
  };

  const updateComment = (payload: any) => {
    if (clashComments && clashComments.length > 0) {
      setClashComments([payload, ...clashComments!]);
    } else {
      setClashComments([payload]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.length > 0) {
      const payload = {
        id: clash.id,
        comment: comment,
        created_at: new Date().toDateString(),
      };
      socket.emit(`clashing_comment-${clash.id}`, payload);
      updateComment(payload);
      setComment("");
    } else {
      toast.warning("Please type at least 2 words 😊");
    }
  };

  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (payload) => {
      updateCounter(payload?.clashItemId);
    });

    socket.on(`clashing_comment-${clash.id}`, (payload) => {
      updateComment(payload);
    });
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItems &&
          clashItems.length > 0 &&
          clashItems.map((item, index) => {
            return (
              <Fragment key={index}>
                {/* First Block */}
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                  <div className="w-full flex justify-center items-center  p-2 h-[300px]">
                    <Image
                      src={getImageUrl(item.image)}
                      width={500}
                      height={500}
                      alt="preview-1"
                      className="w-full h-[300px] object-contain rounded-xl"
                    />
                  </div>
                  {hideVote ? (
                    <CountUp
                      start={0}
                      end={item.count}
                      duration={5}
                      className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    />
                  ) : (
                    <Button
                      className="mt-4"
                      onClick={() => {
                        handleVote(item.id);
                      }}
                    >
                      <span className="mr-2 text-lg">Vote</span> <ThumbsUp />
                    </Button>
                  )}
                </div>
                {/* VS Block */}
                {index % 2 === 0 && (
                  <div className="flex w-full lg:w-auto justify-center items-center">
                    <h1 className="text-7xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                      VS
                    </h1>
                  </div>
                )}
              </Fragment>
            );
          })}
      </div>
      <form className="mt-4 w-full" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Type your suggestions 😊"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="w-full mt-2">Submit comment</Button>
      </form>

      {/* Display comments */}
      <div className="mt-4">
        {clashComments &&
          clashComments.length > 0 &&
          clashComments.map((item, index) => (
            <div
              className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4"
              key={index}
            >
              <p className="font-bold">{item.comment}</p>
              <p>{new Date(item.created_at).toDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clashing;
