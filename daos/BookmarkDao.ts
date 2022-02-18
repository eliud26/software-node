/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookMarkDaoI from "../interfaces/bookMarkDao";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {Bookmarks} Bookmarks Private single instance of UserDao
 */
export default class BookmarkDao implements BookMarkDaoI {
    /**
     * Uses BookmarkModel to insert new values in the bookmarks collection
     * @returns Promise To be notified when the bookmark is inserted in the
     * database
     */
    createBookmark =  async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});

    /**
     * Removes bookmark instance from the database.
     * @param {string} uid Primary key of user to be removed
     * @param {string} tid Primary key of tid to be removed
     * @returns Promise To be notified when bookmark instance is removed from the database
     */
    deleteBookmark = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});

    findAllBookmark = async (): Promise<Bookmark[]> =>
        BookmarkModel.find()
            .populate("bookmarkedBy")
            .populate("bookmarkedTuit")
            .exec();

    findBookmarkByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("bookmarkedBy")
            .populate("bookmarkedTuit")
            .exec();

    findOneBookmark = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.findOne({bookmarkedBy: uid, bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .populate("bookmarkedTuit")
            .exec();




}