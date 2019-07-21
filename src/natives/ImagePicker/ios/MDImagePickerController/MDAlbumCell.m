//
//  MDAlbumCell.m
//  MandMobileRN
//
//  Created by zhuochu on 2019/4/30.
//

#import "MDAlbumCell.h"
#import "MDAssetModel.h"
#import "MDImageManager.h"
#import "MDImagePickerController.h"
#import "MDProgressView.h"
#import "MDCommonTools.h"
#import "UIView+MDExtension.h"

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

@interface MDAlbumCell ()

@property (weak, nonatomic) UIImageView *posterImageView;
@property (weak, nonatomic) UIImageView *arrowImageView;
@property (weak, nonatomic) UILabel     *titleLabel;

@end

@implementation MDAlbumCell

- (void)setModel:(MDAlbumModel *)model {
    _model = model;
    [self updateCellTitle];
    [[MDImageManager manager] getPostImageWithAlbumModel:model completion:^(UIImage *postImage) {
        self.posterImageView.image = postImage;
    }];
}

- (void)updateCellTitle {
    NSMutableAttributedString *nameString = [[NSMutableAttributedString alloc] initWithString:_model.name attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16],NSForegroundColorAttributeName:[UIColor blackColor]}];
    NSAttributedString *countString = [[NSAttributedString alloc] initWithString:[NSString stringWithFormat:@" · %zd",_model.count] attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16],NSForegroundColorAttributeName:[UIColor blackColor]}];
    [nameString appendAttributedString:countString];
    self.titleLabel.attributedText = nameString;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    NSInteger titleHeight = ceil(self.titleLabel.font.lineHeight);
    self.titleLabel.frame = CGRectMake(56, (self.md_height - titleHeight) / 2, self.md_width - 80 - 50, titleHeight);
    self.posterImageView.frame = CGRectMake(0, 16, 40, 40);
    self.arrowImageView.frame = CGRectMake(self.md_width - 6, 30, 6, 11);
}

- (UIImageView *)posterImageView {
    if (_posterImageView == nil) {
        UIImageView *posterImageView = [[UIImageView alloc] init];
        posterImageView.contentMode = UIViewContentModeScaleAspectFill;
        posterImageView.clipsToBounds = YES;
        [self.contentView addSubview:posterImageView];
        _posterImageView = posterImageView;
    }
    return _posterImageView;
}

- (UIImageView *)arrowImageView {
    if (_arrowImageView == nil) {
        UIImageView *arrowImageView = [[UIImageView alloc] init];
        arrowImageView.contentMode = UIViewContentModeScaleAspectFill;
        arrowImageView.clipsToBounds = YES;
        [self.contentView addSubview:arrowImageView];
        _arrowImageView = arrowImageView;
        _arrowImageView.image = [UIImage imageNamed:Theme.cellArrowImageName];
    }
    return _arrowImageView;
}

- (UILabel *)titleLabel {
    if (_titleLabel == nil) {
        UILabel *titleLabel = [[UILabel alloc] init];
        titleLabel.font = [UIFont boldSystemFontOfSize:17];
        titleLabel.textColor = [UIColor blackColor];
        titleLabel.textAlignment = NSTextAlignmentLeft;
        [self.contentView addSubview:titleLabel];
        _titleLabel = titleLabel;
    }
    return _titleLabel;
}

#pragma clang diagnostic pop

@end
