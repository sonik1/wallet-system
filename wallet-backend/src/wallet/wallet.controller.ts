import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';


@Controller()
export class WalletController {

    constructor(private walletService: WalletService) { }

    // Fetch a particular wallet detail using ID
    @Get('wallet/:walletId')
    async getPost(@Res() res, @Param('walletId', new ValidateObjectId()) walletId) {
        const response = await this.walletService.getWalletDetails(walletId);
        if (!response) throw new NotFoundException('Record not found!');
        return res.status(HttpStatus.OK).json(response);

    }

    // setup a wallet
    @Post('/setup')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.walletService.setupWallet(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Account setup successful!",
            wallet: {
                id: newPost.wallet._id,
                balance: newPost.transaction.balance,
                name: newPost.wallet.name,
                transactionId: newPost.transaction._id,
                date: newPost.wallet.date_posted
            }
        })
    }


    // Edit a particular post using ID
    @Put('/transact')
    async editPost(
        @Res() res,
        @Query('walletId', new ValidateObjectId()) walletId,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const response = await this.walletService.transactWallet(walletId, createPostDTO);
        if (!response) throw new NotFoundException('Record not found!');
        return res.status(HttpStatus.OK).json({
            message: 'Transaction is successful!',
            post: response
        })
    }

    // Delete a post using ID
    @Delete('/delete')
    async deletePost(@Res() res, @Query('walletId', new ValidateObjectId()) walletId) {
        const response = await this.walletService.deletePost(walletId);
        if (!response) throw new NotFoundException('Record not found!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: response
        })
    }

    // Fetch all posts
    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.walletService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    //get transactions details as per wallet id
    @Get('/transactions')
    async fetchAll(
        @Res() res,
        @Query('walletId', new ValidateObjectId()) walletId,
        @Query('skip') skip,
        @Query('limit') limit,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const editedPost = await this.walletService.getTransactions(walletId, skip, limit);
        if (!editedPost) throw new NotFoundException('Record not found!');
        return res.status(HttpStatus.OK).json({
            message: 'Transaction is successful!',
            post: editedPost
        })
    }
}
